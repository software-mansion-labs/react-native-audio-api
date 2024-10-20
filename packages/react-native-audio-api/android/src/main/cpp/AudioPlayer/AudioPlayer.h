#pragma once

#include <oboe/Oboe.h>
#include <memory>

namespace audioapi {

using namespace oboe;

class AudioContext;

class AudioPlayer : public AudioStreamDataCallback {
 public:
  explicit AudioPlayer(const std::function<void(float *, int)> &renderAudio);

  int getSampleRate() const;
  void start();
  void stop();

  DataCallbackResult onAudioReady(
      AudioStream *oboeStream,
      void *audioData,
      int32_t numFrames) override;

 private:
  std::function<void(float *, int)> renderAudio_;
  std::shared_ptr<AudioStream> mStream_;
};

} // namespace audioapi
