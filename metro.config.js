const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { mergeConfig } = require("@react-native/metro-config");

const config = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = config.resolver;
const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
  },
};

module.exports = mergeConfig(
  withNativeWind(config, { input: "./src/styles/global.css" }),
  svgConfig
);
