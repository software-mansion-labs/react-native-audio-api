package com.audiocontext.nodes.parameters

class ParamChange(val startTime: Double, val endTime: Double,
                  val startValue: Double, val endValue: Double, val calculateValue: (startTime: Double, endTime: Double, startValue: Double, endValue: Double, time: Double) -> Double
) {
  fun getValueAtTime(time: Double): Double {
    return this.calculateValue(startTime, endTime, startValue, endValue, time)
  }
}