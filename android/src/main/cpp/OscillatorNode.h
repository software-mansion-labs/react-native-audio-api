#pragma once

#include <fbjni/fbjni.h>
#include <jsi/jsi.h>
#include <react/jni/CxxModuleWrapper.h>
#include <react/jni/JMessageQueueThread.h>
#include "OscillatorNodeHostObject.h"
#include "AudioDestinationNode.h"

namespace audiocontext {

    using namespace facebook;
    using namespace facebook::jni;

    class AudioDestinationNode;

    class OscillatorNode : public jni::HybridClass<OscillatorNode> {
    public:
        static auto constexpr kJavaDescriptor = "Lcom/audiocontext/nodes/oscillator/OscillatorNode;";

        static jni::local_ref<OscillatorNode::jhybriddata> initHybrid(jni::alias_ref<jhybridobject> jThis, jlong jsContext)
        {
          return makeCxxInstance(jThis, jsContext);
        }

        static void registerNatives() {
            registerHybrid({
                makeNativeMethod("initHybrid", OscillatorNode::initHybrid),
            });
        }

        void start();
        void stop();
        void setFrequency(jdouble frequency);
        void setDetune(jdouble detune);
        jdouble getFrequency();
        jdouble getDetune();
        void connect(const AudioDestinationNode &destination);

        jsi::Object createOscillatorNodeHostObject();

    private:
        friend HybridBase;

        global_ref<OscillatorNode::javaobject> javaObject_;
        jlong jsContext_;

        explicit OscillatorNode(jni::alias_ref<OscillatorNode::jhybridobject>& jThis, jlong jsContext);
    };

} // namespace audiocontext