#ifdef ANDROID
#include "StereoPannerNodeWrapper.h"

namespace audioapi {

StereoPannerNodeWrapper::StereoPannerNodeWrapper(StereoPannerNode *pannerNode)
    : AudioNodeWrapper(pannerNode) {
  auto panParam = pannerNode->getPanParam();
  panParam_ = std::make_shared<AudioParamWrapper>(panParam);
}

std::shared_ptr<AudioParamWrapper> StereoPannerNodeWrapper::getPanParam()
    const {
  return panParam_;
}
} // namespace audioapi
#endif