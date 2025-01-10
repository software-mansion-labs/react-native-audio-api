const COLLAPSED_STACK_REGEX = new RegExp(
  [
    // For internal usage in the example app
    '/packages/react-native-audio-api/.+\\.(t|j)sx?$',
    // When audio-api is installed as a dependency (node_modules)
    '/node_modules/react-native-audio-api/.+\\.(t|j)sx?$',
  ]
    // Make patterns work with both Windows and POSIX paths.
    .map((pathPattern) => pathPattern.replaceAll('/', '[/\\\\]'))
    .join('|')
);

/**
 * @param {import('@react-native/metro-config').MetroConfig} config
 * @returns {import('@react-native/metro-config').MetroConfig}
 */
function wrapWithAudioAPIMetroConfig(config) {
  return {
    ...config,
    symbolicator: {
      async customizeFrame(frame) {
        const collapse = Boolean(
          // Collapse the stack frame based on user's config symbolicator settings
          (await config?.symbolicator?.customizeFrame?.(frame))?.collapse ||
            // or, if not already collapsed, collapse the stack frame with path
            // to react-native-audio-api source code
            (frame.file && COLLAPSED_STACK_REGEX.test(frame.file))
        );
        return {
          collapse,
        };
      },
    },
  };
}

module.exports = {
  wrapWithAudioAPIMetroConfig,
};
