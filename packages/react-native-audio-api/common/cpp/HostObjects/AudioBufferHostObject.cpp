#include "AudioBufferHostObject.h"

namespace audioapi {
using namespace facebook;

AudioBufferHostObject::AudioBufferHostObject(
    const std::shared_ptr<AudioBufferWrapper> &wrapper)
    : wrapper_(wrapper) {}

std::vector<jsi::PropNameID> AudioBufferHostObject::getPropertyNames(
    jsi::Runtime &runtime) {
  std::vector<jsi::PropNameID> propertyNames;
  propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "buffer"));
  propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "sampleRate"));
  propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "length"));
  propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "duration"));
  propertyNames.push_back(
      jsi::PropNameID::forAscii(runtime, "numberOfChannels"));
  propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "getChannelData"));
  propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "setChannelData"));
  return propertyNames;
}

jsi::Value AudioBufferHostObject::get(
    jsi::Runtime &runtime,
    const jsi::PropNameID &propNameId) {
  auto propName = propNameId.utf8(runtime);

  if (propName == "sampleRate") {
    return {wrapper_->getSampleRate()};
  }

  if (propName == "length") {
    return {wrapper_->getLength()};
  }

  if (propName == "duration") {
    return {wrapper_->getDuration()};
  }

  if (propName == "numberOfChannels") {
    return {wrapper_->getNumberOfChannels()};
  }

  if (propName == "getChannelData") {
    return jsi::Function::createFromHostFunction(
        runtime,
        propNameId,
        1,
        [this](
            jsi::Runtime &rt,
            const jsi::Value &thisVal,
            const jsi::Value *args,
            size_t count) -> jsi::Value {
          int channel = static_cast<int>(args[0].getNumber());
          float *channelData = wrapper_->getChannelData(channel);

          auto array = jsi::Array(rt, wrapper_->getLength());
          for (int i = 0; i < wrapper_->getLength(); i++) {
            array.setValueAtIndex(rt, i, jsi::Value(channelData[i]));
          }

          return array;
        });
  }

  if (propName == "setChannelData") {
    return jsi::Function::createFromHostFunction(
        runtime,
        propNameId,
        2,
        [this](
            jsi::Runtime &rt,
            const jsi::Value &thisVal,
            const jsi::Value *args,
            size_t count) -> jsi::Value {
          int channel = static_cast<int>(args[0].getNumber());
          auto array = args[1].getObject(rt).asArray(rt);
          auto *channelData = new float[wrapper_->getLength()];

          for (int i = 0; i < wrapper_->getLength(); i++) {
            channelData[i] =
                static_cast<float>(array.getValueAtIndex(rt, i).getNumber());
          }

          wrapper_->setChannelData(channel, channelData, wrapper_->getLength());

          return jsi::Value::undefined();
        });
  }

  throw std::runtime_error("Not yet implemented!");
}

void AudioBufferHostObject::set(
    jsi::Runtime &runtime,
    const jsi::PropNameID &propNameId,
    const jsi::Value &value) {
  auto propName = propNameId.utf8(runtime);

  throw std::runtime_error("Not yet implemented!");
}

} // namespace audioapi
