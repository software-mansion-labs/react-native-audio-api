#pragma once

#ifdef __OBJC__ // when compiled as Objective-C++
#import <AudioScheduledSourceNode.h>
#else // when compiled as C++
typedef struct objc_object AudioScheduledSourceNode;
#endif // __OBJC__

#import <memory>
#include <string>
#import "IOSAudioNode.h"

namespace audioapi {
class IOSAudioScheduledSourceNode : public IOSAudioNode {
 protected:
  AudioScheduledSourceNode *audioScheduledSourceNode_;

 public:
  ~IOSAudioScheduledSourceNode();
  void start(double time) const;
  void stop(double time) const;
};
} // namespace audioapi