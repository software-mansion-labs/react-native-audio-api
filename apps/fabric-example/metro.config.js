const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const projectRoot = __dirname;
const repositoryRoot = path.resolve(projectRoot, '../..');
// @ts-expect-error
const exclusionList = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');

const duplicatedModules = ['react', 'react-dom', 'react-native'];

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot,
  watchFolders: [repositoryRoot],

  resolver: {
    blacklistRE: exclusionList(
      duplicatedModules.map(
        (m) =>
          new RegExp(
            `^${escape(path.join(repositoryRoot, 'node_modules', m))}\\/.*$`
          )
      )
    ),

    extraNodeModules: duplicatedModules.reduce((acc, name) => {
      // @ts-expect-error
      acc[name] = path.join(projectRoot, 'node_modules', name);
      return acc;
    }, {}),
  },
};

module.exports = mergeConfig(getDefaultConfig(projectRoot), config);
