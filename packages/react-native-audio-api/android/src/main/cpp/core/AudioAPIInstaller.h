#pragma once

#include <ReactCommon/CallInvokerHolder.h>
#include <fbjni/fbjni.h>
#include <react/jni/CxxModuleWrapper.h>
#include <react/jni/JMessageQueueThread.h>
#include <memory>
#include <utility>

#include "AudioAPIInstallerHostObject.h"
#include "AudioContext.h"

namespace audioapi {

using namespace facebook;
using namespace react;

class AudioAPIInstaller : public jni::HybridClass<AudioAPIInstaller> {
 public:
  static auto constexpr kJavaDescriptor =
      "Lcom/swmansion/audioapi/module/AudioAPIInstaller;";

  static jni::local_ref<AudioAPIInstaller::jhybriddata> initHybrid(
      jni::alias_ref<jhybridobject> jThis,
      jlong jsContext,
      jni::alias_ref<facebook::react::CallInvokerHolder::javaobject>
          jsCallInvokerHolder);

  static void registerNatives();

  void install();

 private:
  friend HybridBase;

  jni::global_ref<AudioAPIInstaller::javaobject> javaPart_;
  jsi::Runtime *jsiRuntime_;
  std::shared_ptr<facebook::react::CallInvoker> jsCallInvoker_;

  explicit AudioAPIInstaller(
      jni::alias_ref<AudioAPIInstaller::jhybridobject> &jThis,
      jsi::Runtime *rnRuntime,
      const std::shared_ptr<facebook::react::CallInvoker> &jsCallInvoker);
};

} // namespace audioapi
