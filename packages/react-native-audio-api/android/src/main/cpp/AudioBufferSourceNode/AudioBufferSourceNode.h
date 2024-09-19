#pragma once

#include "AudioBuffer.h"
#include "AudioScheduledSourceNode.h"

namespace audioapi {

using namespace facebook;
using namespace facebook::jni;

class AudioBufferSourceNode
    : public jni::HybridClass<AudioBufferSourceNode, AudioScheduledSourceNode> {
 public:
  static auto constexpr kJavaDescriptor =
      "Lcom/swmansion/audioapi/nodes/AudioBufferSourceNode;";

  bool getLoop();
  void setLoop(bool loop);
  AudioBuffer *getBuffer();
  void setBuffer(const AudioBuffer *buffer);
};
} // namespace audioapi