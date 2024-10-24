#pragma once

#include <memory>
#include <optional>

#include "AudioBuffer.h"
#include "AudioScheduledSourceNode.h"

namespace audioapi {

class AudioBufferSourceNode : public AudioScheduledSourceNode {
 public:
  explicit AudioBufferSourceNode(AudioContext *context);

  bool getLoop() const;
  std::shared_ptr<AudioBuffer> getBuffer() const;
  void setLoop(bool loop);
  void setBuffer(const std::shared_ptr<AudioBuffer> &buffer);
  bool processAudio(float *audioData, int32_t numFrames) override;

 private:
  bool loop_;
  std::optional<std::shared_ptr<AudioBuffer>> buffer_;
  int bufferIndex_;
};
} // namespace audioapi
