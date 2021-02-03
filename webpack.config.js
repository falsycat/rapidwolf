const path = require("path");

const plugins = {
  htmlWebpack: require("html-webpack-plugin"),
};

module.exports = {
  entry: "./frontend/js/main.js",
  output: {
    filename: "script.js",
    path: path.join(__dirname, "public", "static")
  },
  plugins: [
      new plugins.htmlWebpack({
        template: path.resolve(__dirname, "frontend" , "index.html"),
        filename: "index.html",
        inject: "head",
      }),
  ],
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              importLoaders: 2
            }
          },
          "sass-loader",
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public", "static")
  },
};