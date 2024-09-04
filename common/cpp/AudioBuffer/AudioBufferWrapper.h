#pragma once

#include <memory>

#ifdef ANDROID
#include "AudioBuffer.h"
#else
#endif

namespace audiocontext {

class AudioBufferWrapper {
#ifdef ANDROID

 public:
  AudioBuffer *audioBuffer_;

  explicit AudioBufferWrapper(AudioBuffer *audioBuffer);
  ~AudioBufferWrapper();
#else

 public:
  AudioBufferWrapper() {}
#endif

 private:
  int sampleRate;
  int length;
  double duration;
  int numberOfChannels;

 public:
  int getSampleRate() const;
  int getLength() const;
  double getDuration() const;
  int getNumberOfChannels() const;
  int16_t **getChannelData(int channel) const;
  void setChannelData(int channel, int16_t **data) const;
};
} // namespace audiocontext