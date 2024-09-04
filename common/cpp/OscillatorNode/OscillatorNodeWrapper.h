#pragma once

#include <memory>
#include <string>
#include "AudioNodeWrapper.h"
#include "AudioParamWrapper.h"

#ifdef ANDROID
#include "OscillatorNode.h"
#else
#include "IOSOscillatorNode.h"
#endif

namespace audiocontext {

#ifdef ANDROID
class OscillatorNode;
#endif

class OscillatorNodeWrapper : public AudioNodeWrapper {
#ifdef ANDROID

 private:
  OscillatorNode *getOscillatorNodeFromAudioNode();

 public:
  explicit OscillatorNodeWrapper(OscillatorNode *oscillator);
  ~OscillatorNodeWrapper() override;
#else

 private:
  std::shared_ptr<IOSOscillatorNode> getOscillatorNodeFromAudioNode();

 public:
  explicit OscillatorNodeWrapper(std::shared_ptr<IOSAudioContext> context);
#endif

 private:
  std::shared_ptr<AudioParamWrapper> frequencyParam_;
  std::shared_ptr<AudioParamWrapper> detuneParam_;

 public:
  std::shared_ptr<AudioParamWrapper> getFrequencyParam() const;
  std::shared_ptr<AudioParamWrapper> getDetuneParam() const;
  std::string getType();
  void start(double time);
  void stop(double time);
  void setType(const std::string &type);
};
} // namespace audiocontext