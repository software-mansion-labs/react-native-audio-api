package com.audiocontext.nativemodules

import com.audiocontext.context.AudioContext
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AudioContextModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "AudioContextModule"
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun initAudioContext() {
    AudioContext(reactContext)
  }
}