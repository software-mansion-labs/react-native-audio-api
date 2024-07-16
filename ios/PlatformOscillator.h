#pragma once

#ifdef __OBJC__ // when compiled as Objective-C++
#import <IOSOscillator.h>
#else // when compiled as C++
typedef struct objc_object IOSOscillator;
#endif // __OBJC__

namespace audiocontext {
	class PlatformOscillator {
		public:
			explicit PlatformOscillator(const float frequency);
			void start() const;
			void stop() const;
            void changeFrequency(const float frequency) const;

		protected:
			IOSOscillator *iosOscillator_;
	};
} // namespace audiocontext