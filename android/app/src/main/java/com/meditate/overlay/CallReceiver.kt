package com.buopso.overlay

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.TelephonyManager
import androidx.core.content.ContextCompat

class CallReceiver : BroadcastReceiver() {
    override fun onReceive(ctx: Context, intent: Intent) {
        when (intent.getStringExtra(TelephonyManager.EXTRA_STATE)) {
            TelephonyManager.EXTRA_STATE_RINGING -> {
                val incoming = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)
                Intent(ctx, OverlayService::class.java).also { svc ->
                    svc.putExtra("number", incoming)
                    ContextCompat.startForegroundService(ctx, svc)
                }
            }
            TelephonyManager.EXTRA_STATE_IDLE -> {
                // call ended (or missed) → remove overlay
                ctx.stopService(Intent(ctx, OverlayService::class.java))
            }
        }
    }
}
