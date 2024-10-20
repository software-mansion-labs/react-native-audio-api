#include "StereoPannerNodeHostObject.h"

namespace audioapi {
using namespace facebook;

StereoPannerNodeHostObject::StereoPannerNodeHostObject(
    const std::shared_ptr<StereoPannerNodeWrapper> &wrapper)
    : AudioNodeHostObject(wrapper) {
  auto panParam = wrapper->getPanParam();
  panParam_ = AudioParamHostObject::createFromWrapper(panParam);
}

std::vector<jsi::PropNameID> StereoPannerNodeHostObject::getPropertyNames(
    jsi::Runtime &runtime) {
  std::vector<jsi::PropNameID> propertyNames =
      AudioNodeHostObject::getPropertyNames(runtime);
  propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "pan"));
  return propertyNames;
}

jsi::Value StereoPannerNodeHostObject::get(
    jsi::Runtime &runtime,
    const jsi::PropNameID &propNameId) {
  auto propName = propNameId.utf8(runtime);

  if (propName == "pan") {
    return jsi::Object::createFromHostObject(runtime, panParam_);
  }

  return AudioNodeHostObject::get(runtime, propNameId);
}

void StereoPannerNodeHostObject::set(
    jsi::Runtime &runtime,
    const jsi::PropNameID &propNameId,
    const jsi::Value &value) {
  auto propName = propNameId.utf8(runtime);

  return AudioNodeHostObject::set(runtime, propNameId, value);
}
} // namespace audioapi
