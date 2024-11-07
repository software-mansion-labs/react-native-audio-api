const { getDefaultConfig } = require('expo/metro-config');

const path = require('path');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');

// Find the project and workspace directories
const projectRoot = __dirname;
// This can be replaced with `find-yarn-workspace-root`
const repositoryRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.projectRoot = projectRoot;

// 1. Watch all files within the monorepo
config.watchFolders = [repositoryRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(repositoryRoot, 'node_modules'),
];

const modulesToBlock = ['react', 'react-dom', 'react-native'];

config.resolver.blacklistRE = exclusionList(
  modulesToBlock.map(
    (m) =>
      new RegExp(
        `^${escape(path.join(repositoryRoot, 'node_modules', m))}\\/.*$`
      )
  )
);

module.exports = config;
