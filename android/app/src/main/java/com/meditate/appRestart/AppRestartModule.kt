package com.buopso.appRestart

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AppRestartModule(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    override fun getName(): String {
        return "AppRestart"
    }

    @ReactMethod
    fun restart() {
        val currentActivity = currentActivity
        currentActivity?.let {
            val intent = it.intent
            it.finish()
            it.startActivity(intent)
        }
    }
}