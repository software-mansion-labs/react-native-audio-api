#pragma once

#include <audioapi/core/AudioNode.h>
#include <audioapi/core/AudioParam.h>

#include <memory>

namespace audioapi {

class AudioBus;

class GainNode : public AudioNode {
 public:
  explicit GainNode(BaseAudioContext *context);

  [[nodiscard]] std::shared_ptr<AudioParam> getGainParam() const;

 protected:
  void processNode(const std::shared_ptr<AudioBus>& processingBus, int framesToProcess) override;

 private:
  std::shared_ptr<AudioParam> gainParam_;
};

} // namespace audioapi
