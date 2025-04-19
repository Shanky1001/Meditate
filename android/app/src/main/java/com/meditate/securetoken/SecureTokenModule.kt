package com.buopso.securetoken

import android.content.Context
import android.content.SharedPreferences
import androidx.security.crypto.EncryptedSharedPreferences
import androidx.security.crypto.MasterKey
import com.facebook.react.bridge.*

class SecureTokenModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {



    companion object {
        private const val PREF_NAME = "secure_prefs"
        private const val TOKEN_KEY = "AuthToken";
        private const val REFRESH_TOKEN_KEY = "RefreshToken"
        data class KEYS(val token: String, val refToken: String)
        
        private fun getEncryptedPrefs(context: Context): SharedPreferences {
            val masterKey = MasterKey.Builder(context)
                .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
                .build()

            return EncryptedSharedPreferences.create(
                context,
                PREF_NAME,
                masterKey,
                EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
                EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
            )
        }

        fun getToken(context: Context, key:String): String? {
            return getEncryptedPrefs(context).getString(key, null)
        }

        fun setToken(context: Context,key:String, token: String) {
            getEncryptedPrefs(context).edit().putString(key, token).apply()
        }

        fun clearToken(context: Context, key: String) {
            getEncryptedPrefs(context).edit().remove(key).apply()
        }

        fun getConstantKeys():KEYS {
            return KEYS(token = TOKEN_KEY, refToken = REFRESH_TOKEN_KEY)
        }

    }

    override fun getName() = "SecureToken"

    @ReactMethod
    fun setToken(key: String, token: String, promise: Promise) {
        try {
            setToken(reactContext, key, token)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("SAVE_ERROR", e.message)
        }
    }

    @ReactMethod
    fun getToken(key: String,promise: Promise) {
        try {
            val token = getToken(reactContext, key)
            if (token != null) {
                promise.resolve(token)
            } else {
                promise.reject("NO_TOKEN", "No token found")
            }
        } catch (e: Exception) {
            promise.reject("GET_ERROR", e.message)
        }
    }

    @ReactMethod
    fun clearToken(key: String, promise: Promise) {
        try {
            clearToken(reactContext, key)
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("CLEAR_ERROR", e.message)
        }
    }

    @ReactMethod
    fun getConstantKeys(promise: Promise) {
        val keys = getConstantKeys()
        val map = Arguments.createMap()
        map.putString("token", keys.token)
        map.putString("refToken", keys.refToken)
        promise.resolve(map)
    }
}
