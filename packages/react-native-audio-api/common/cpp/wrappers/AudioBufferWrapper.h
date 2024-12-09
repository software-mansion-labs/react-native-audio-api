#pragma once

#include <memory>

#include "AudioBuffer.h"

namespace audioapi {

class AudioBufferWrapper {
 public:
  explicit AudioBufferWrapper(const std::shared_ptr<AudioBuffer> &audioBuffer);

  std::shared_ptr<AudioBuffer> audioBuffer_;
  [[nodiscard]] int getNumberOfChannels() const;
  [[nodiscard]] int getLength() const;
  [[nodiscard]] double getDuration() const;
  [[nodiscard]] int getSampleRate() const;
  [[nodiscard]] float *getChannelData(int channel) const;
  void copyFromChannel(
      float *destination,
      int destinationLength,
      int channelNumber,
      int startInChannel = 0) const;
  void copyToChannel(
      float *source,
      int sourceLength,
      int channelNumber,
      int startInChannel = 0) const;
};
} // namespace audioapi
