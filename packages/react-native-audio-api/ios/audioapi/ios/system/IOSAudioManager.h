#pragma once

#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

@interface IOSAudioManager : NSObject

@property (nonatomic, strong) AVAudioEngine *audioEngine;
@property (nonatomic, weak) AVAudioSession *audioSession;
@property (nonatomic, weak) NSNotificationCenter *notificationCenter;
@property (nonatomic, strong) NSMutableDictionary *sourceNodes;
@property (nonatomic, strong) NSMutableDictionary *sourceFormats;

- (instancetype)init;
- (void)cleanup;
- (float)getSampleRate;

- (bool)configureAudioSession;
- (bool)configureNotifications;
- (bool)rebuildAudioEngine;
- (void)startEngine;
- (void)stopEngine;

- (NSString *)attachSourceNode:(AVAudioSourceNode *)sourceNode format:(AVAudioFormat *)format;
- (void)detachSourceNodeWithId:(NSString *)sourceNodeId;

- (void)handleInterruption:(NSNotification *)notification;
- (void)handleRouteChange:(NSNotification *)notification;
- (void)handleMediaServicesReset:(NSNotification *)notification;
- (void)handleEngineConfigurationChange:(NSNotification *)notification;

@end
