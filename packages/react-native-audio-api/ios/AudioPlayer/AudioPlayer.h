#pragma once

#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

typedef void (^RenderAudioBlock)(AudioBufferList *outputBuffer, int numFrames);

@interface AudioPlayer : NSObject

@property (nonatomic, strong) AVAudioEngine *audioEngine;
@property (nonatomic, weak) AVAudioSession *audioSession;
@property (nonatomic, strong) AVAudioFormat *format;
@property (nonatomic, strong) AVAudioSourceNode *sourceNode;
@property (nonatomic, copy) RenderAudioBlock renderAudio;

- (instancetype)initWithRenderAudioBlock:(RenderAudioBlock)renderAudio;

- (int)getSampleRate;

- (int)getBufferSizeInFrames;

- (void)start;

- (void)stop;

- (void)cleanup;

@end
