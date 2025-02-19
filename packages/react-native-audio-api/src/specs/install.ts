import { TurboModuleRegistry, TurboModule } from 'react-native';

interface AudioAPIModuleSpec extends TurboModule {
  install(): boolean;
}

export function installModule() {
  const AudioAPIModule =
    TurboModuleRegistry.get<AudioAPIModuleSpec>('AudioAPIModule');

  if (AudioAPIModule == null) {
    throw new Error(
      `Failed to install react-native-audio-api: The native module could not be found.`
    );
  }

  const result = AudioAPIModule.install();

  if (result !== true) {
    throw new Error(
      `Failed to install react-native-audio-api: The native Audio API Module could not be installed! Looks like something went wrong when installing JSI bindings: ${result}`
    );
  }

  if (global.__AudioAPIInstaller == null) {
    throw new Error(
      'Failed to install react-native-audio-api, the native initializer private does not exist. Are you trying to use Audio API from different JS Runtimes?'
    );
  }

  return AudioAPIModule;
}
