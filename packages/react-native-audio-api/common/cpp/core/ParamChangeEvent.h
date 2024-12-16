#pragma once

#include <functional>
#include <memory>
#include "ParamChangeEventType.h"

namespace audioapi {

class ParamChangeEvent {
 public:
  explicit ParamChangeEvent(
      double startTime,
      double endTime,
      float startValue,
      float endValue,
      std::function<float(double, double, float, float, double)> calculateValue,
      ParamChangeEventType type);

  [[nodiscard]] double getEndTime() const;
  [[nodiscard]] double getStartTime() const;
  [[nodiscard]] float getEndValue() const;
  [[nodiscard]] float getStartValue() const;
  [[nodiscard]] std::function<float(double, double, float, float, double)>
  getCalculateValue() const;
  [[nodiscard]] ParamChangeEventType getType() const;

  void setEndTime(double endTime);
  void setStartValue(float startValue);
  void setEndValue(float endValue);

  bool operator<(const ParamChangeEvent &other) const;

 private:
  double startTime_;
  double endTime_;
  float startValue_;
  float endValue_;
  std::function<float(double, double, float, float, double)> calculateValue_;
  ParamChangeEventType type_;
};

} // namespace audioapi
