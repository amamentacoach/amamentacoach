/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const extraNodeModules = {
    common: path.resolve(`${__dirname}/../backend/common`),
  };
  const watchFolders = [path.resolve(`${__dirname}/../backend/common`)];
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
      extraNodeModules,
    },
    watchFolders,
  };
})();
