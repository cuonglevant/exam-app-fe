module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            "@": ".",
            "@components": "./components",
            "@constants": "./constants",
            "@hooks": "./hooks",
          },
        },
      ],
    ],
  };
};
