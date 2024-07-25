#include "AudioNodeHostObject.h"

namespace audiocontext {
    using namespace facebook;

    std::vector<jsi::PropNameID> AudioNodeHostObject::getPropertyNames(jsi::Runtime& runtime) {
        std::vector<jsi::PropNameID> propertyNames;
        propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "connect"));
        propertyNames.push_back(jsi::PropNameID::forAscii(runtime, "disconnect"));
        return propertyNames;
    }

    jsi::Value AudioNodeHostObject::get(jsi::Runtime& runtime, const jsi::PropNameID& propNameId) {
        auto propName = propNameId.utf8(runtime);

        if (propName == "connect")
        {
            return jsi::Function::createFromHostFunction(runtime, propNameId, 1, [this](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value
            {
                auto node = args[0].getObject(rt).getHostObject<AudioNodeHostObject>(rt);
                wrapper_->connect(std::shared_ptr<AudioNodeHostObject>(node)->wrapper_);
                return jsi::Value::undefined();
            });
        }

        if (propName == "disconnect")
        {
            return jsi::Function::createFromHostFunction(runtime, propNameId, 1, [this](jsi::Runtime &rt, const jsi::Value &thisValue, const jsi::Value *args, size_t count) -> jsi::Value
            {
                auto node = args[0].getObject(rt).getHostObject<AudioNodeHostObject>(rt);
                wrapper_->disconnect(std::shared_ptr<AudioNodeHostObject>(node)->wrapper_);
                return jsi::Value::undefined();
            });
        }

        throw std::runtime_error("Not yet implemented!");
    }

    void AudioNodeHostObject::set(jsi::Runtime& runtime, const jsi::PropNameID& propNameId, const jsi::Value& value) {
        auto propName = propNameId.utf8(runtime);

        throw std::runtime_error("Not yet implemented!");
    }

}