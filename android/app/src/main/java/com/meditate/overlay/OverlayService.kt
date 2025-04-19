package com.buopso.overlay

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.graphics.Color
import android.graphics.PixelFormat
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.util.Log
import android.view.*
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView
import androidx.core.app.NotificationCompat
import com.bumptech.glide.Glide
import com.buopso.BuildConfig
import com.buopso.MainActivity
import com.buopso.R
import com.buopso.securetoken.SecureTokenModule
import com.google.gson.Gson
import com.google.gson.JsonSyntaxException
import okhttp3.OkHttpClient
import okhttp3.Request


class OverlayService : Service() {
    private lateinit var wm: WindowManager
    private var overlayView: View? = null
    private var token = ""
    private var refToken = ""
    private var leadId = ""
    private var pipelineId = ""

    companion object {
        private const val CHANNEL_ID = "overlay_service"
        private const val NOTIFICATION_ID = 1
        private const val BASE_URL = BuildConfig.API_URL
        private const val URL = "$BASE_URL/ims/records/data?phone="
        private val KEYS = SecureTokenModule.getConstantKeys()
    }

    override fun onCreate() {
        super.onCreate()
        wm = getSystemService(WINDOW_SERVICE) as WindowManager
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val incoming = intent?.getStringExtra("number")

        // Remove old overlay if any
        overlayView?.let {
            wm.removeView(it)
            overlayView = null
        }

        try {
            token = SecureTokenModule.getToken(applicationContext, KEYS.token).orEmpty()
            refToken = SecureTokenModule.getToken(applicationContext, KEYS.refToken).orEmpty()
        } catch (e: Exception) {
            Log.e("Fetching Token", e.message ?: "Token fetch failed")
        }

        if (token.isEmpty() || refToken.isEmpty() || incoming.isNullOrEmpty()) return START_NOT_STICKY

        val inflater = getSystemService(LAYOUT_INFLATER_SERVICE) as LayoutInflater
        val view = inflater.inflate(R.layout.alert_layout, null)
        overlayView = view

        // Set up window params
        val type = WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        val marginInDp = 15
        val scale = resources.displayMetrics.density
        val marginInPx = (marginInDp * scale).toInt()

        val params = WindowManager.LayoutParams(
            resources.displayMetrics.widthPixels - (2 * marginInPx),
            WindowManager.LayoutParams.WRAP_CONTENT,
            type,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                    WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.CENTER_HORIZONTAL
            x = 0
            y = 100  // Optional vertical offset
        }

        wm.addView(view, params)
        overlayView?.findViewById<TextView>(R.id.number)?.text = incoming
        // Fetch API data in background thread
        Thread {
            val requestURL = URL + incoming
            try {
                val client = OkHttpClient()
                val request = Request.Builder()
                    .url(requestURL)
                    .addHeader("Authorization", "Bearer $token")
                    .addHeader("Cookie", refToken)
                    .addHeader("Content-Type", "application/json")
                    .addHeader("User-Agent",
                        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1")
                    .build()
                val response = client.newCall(request).execute()

                if (response.isSuccessful) {
                    val json = response.body?.string() ?: ""
                    try {
                        val apiResponse = Gson().fromJson(json, ApiResponse::class.java)
                        val record = apiResponse.result.firstOrNull()?.records?.firstOrNull()
                        pipelineId = apiResponse.result.firstOrNull()?.asset?.id ?: ""
                        if (record != null) {
                            leadId = record.id
                            val stageLabel = record.stage.label
                            val stageColor = record.stage.color
                            val leadLabel = record.label
                            val iconUrl = record.icon ?: R.drawable.phone

                            Handler(Looper.getMainLooper()).post {
                                overlayView?.findViewById<TextView>(R.id.label)?.text = leadLabel
                                overlayView?.findViewById<TextView>(R.id.subLabel)?.apply {
                                    text = stageLabel
                                    try {
                                        setTextColor(Color.parseColor(stageColor))
                                    } catch (e: IllegalArgumentException) {
                                        setTextColor(Color.BLACK) // Fallback to black if color parsing fails
                                    }
                                }
                               overlayView?.findViewById<ImageView>(R.id.user_icon)?.let {
                                   Glide.with(it.context)
                                       .load(iconUrl)
                                       .placeholder(R.drawable.phone)
                                       .into(it)
                               }
                            }
                        }
                    } catch (e: JsonSyntaxException) {
                        Log.e("API_PARSE", "Failed to parse API response", e)
                    }
                } else {
                    val errorBody = response.body?.string()
                    Log.e("OverlayService", "API failed: $errorBody")
                }
            } catch (e: Exception) {
                Log.e("OverlayService", "Error fetching number details", e)
            }
        }.start()

        // Buttons
        view.findViewById<Button>(R.id.btn_cancel)?.setOnClickListener { removeView() }
        view.findViewById<Button>(R.id.btn_detail)?.setOnClickListener {
            val appIntent:Intent
            if(leadId.isEmpty() || pipelineId.isEmpty()){
            appIntent = Intent(this, MainActivity::class.java).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            }
            } else {
                appIntent = Intent(Intent.ACTION_VIEW).apply {
                    data = Uri.parse("buopso.lms://screens/assetDetail?leadId=$leadId&pipelineId=$pipelineId")
                    addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
                }
            }

            startActivity(appIntent)
            removeView()
        }

        startForeground(
            NOTIFICATION_ID, NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Incoming call")
            .setContentText("Tap to view details")
            .setSmallIcon(R.drawable.phone)
            .build())

        return START_NOT_STICKY
    }

    override fun onDestroy() {
        removeView()
        super.onDestroy()
    }

    private fun removeView() {
        overlayView?.let {
            wm.removeView(it)
            overlayView = null
        }
        stopForeground(true)
    }

    override fun onBind(intent: Intent?) = null

    private fun createNotificationChannel() {
            val channel = NotificationChannel(CHANNEL_ID, "Call Overlay", NotificationManager.IMPORTANCE_LOW)
            getSystemService(NotificationManager::class.java)?.createNotificationChannel(channel)
    }

}
