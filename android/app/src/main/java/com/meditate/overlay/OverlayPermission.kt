package com.buopso.overlay

import android.content.Intent
import android.net.Uri
import android.provider.Settings
import android.widget.Toast
import com.facebook.react.bridge.*

class OverlayPermission(private val reactContext: ReactApplicationContext):
ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "OverlayPermission"

    @ReactMethod
    fun canDrawOverlays(promise: Promise) {
        promise.resolve(Settings.canDrawOverlays(reactContext))
    }

    @ReactMethod
    fun requestOverlayPermission() {
        if (!Settings.canDrawOverlays(reactContext)) {
            val intent = Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:${reactContext.packageName}")
            )
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            reactContext.startActivity(intent)
        } else {
            Toast.makeText(reactContext, "Overlay permission already granted", Toast.LENGTH_SHORT).show()
        }
    }
}