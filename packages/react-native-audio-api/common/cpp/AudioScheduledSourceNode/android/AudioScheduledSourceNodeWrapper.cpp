#ifdef ANDROID
#include "AudioScheduledSourceNodeWrapper.h"

namespace audioapi {

AudioScheduledSourceNode *
AudioScheduledSourceNodeWrapper::getAudioScheduledSourceNodeFromAudioNode() {
  return static_cast<AudioScheduledSourceNode *>(node_);
}

void AudioScheduledSourceNodeWrapper::start(double time) {
  auto audioScheduledSourceNode = getAudioScheduledSourceNodeFromAudioNode();
  audioScheduledSourceNode->start(time);
}

void AudioScheduledSourceNodeWrapper::stop(double time) {
  auto audioScheduledSourceNode = getAudioScheduledSourceNodeFromAudioNode();
  audioScheduledSourceNode->stop(time);
}
} // namespace audioapi
#endif