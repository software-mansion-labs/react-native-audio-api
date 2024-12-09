#pragma once

#include <memory>
#include <set>
#include <vector>

#include "ParamChange.h"

namespace audioapi {

class BaseAudioContext;

class AudioParam {
 public:
  explicit AudioParam(
      BaseAudioContext *context,
      float defaultValue,
      float minValue,
      float maxValue);

  [[nodiscard]] float getValue() const;
  float getValueAtTime(double time);
  void setValue(float value);
  [[nodiscard]] float getDefaultValue() const;
  [[nodiscard]] float getMinValue() const;
  [[nodiscard]] float getMaxValue() const;
  void setValueAtTime(float value, double startTime);
  void linearRampToValueAtTime(float value, double endTime);
  void exponentialRampToValueAtTime(float value, double endTime);

 private:
  float value_;
  float defaultValue_;
  float minValue_;
  float maxValue_;
  BaseAudioContext *context_;
  std::set<ParamChange> changesQueue_;

  double startTime_;
  double endTime_;
  float startValue_;
  float endValue_;
  std::function<float(double, double, float, float, double)> calculateValue_;

  float checkValue(float value) const;
  double getStartTime();
  float getStartValue();
};

} // namespace audioapi
