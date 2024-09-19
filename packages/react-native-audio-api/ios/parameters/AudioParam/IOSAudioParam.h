#pragma once

#ifdef __OBJC__ // when compiled as Objective-C++
#import <AudioParam.h>
#else // when compiled as C++
typedef struct objc_object AudioParam;
#endif // __OBJC__

namespace audioapi {
class IOSAudioParam {
 protected:
  AudioParam *audioParam_;

 public:
  IOSAudioParam(AudioParam *audioParam);
  ~IOSAudioParam();
  void setValue(float value);
  float getValue();
  float getMinValue();
  float getMaxValue();
  float getDefaultValue();
  void setValueAtTime(float value, double time);
  void linearRampToValueAtTime(float value, double time);
  void exponentialRampToValueAtTime(float value, double time);
};
} // namespace audioapi