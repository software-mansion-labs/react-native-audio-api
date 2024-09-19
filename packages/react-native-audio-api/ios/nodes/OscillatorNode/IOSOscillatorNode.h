#pragma once

#ifdef __OBJC__ // when compiled as Objective-C++
#import <OscillatorNode.h>
#else // when compiled as C++
typedef struct objc_object OscillatorNode;
#endif // __OBJC__

#include "IOSAudioParam.h"
#include "IOSAudioScheduledSourceNode.h"

namespace audioapi {
class IOSOscillatorNode : public IOSAudioScheduledSourceNode {
 protected:
  OscillatorNode *oscillatorNode_;

 public:
  explicit IOSOscillatorNode(OscillatorNode *oscillator);
  ~IOSOscillatorNode();
  void setType(const std::string &type) const;
  std::string getType() const;
  std::shared_ptr<IOSAudioParam> getFrequencyParam();
  std::shared_ptr<IOSAudioParam> getDetuneParam();
};
} // namespace audioapi