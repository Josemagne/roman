const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "/public", "index.html"),
      filename: "index.html",
      inject: "body",
    }),
  ],
};

if (isProduction) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    static: resolve(__dirname, "publi"),
    compress: true,
    hot: true,
    host: "localhost",
    port: 5000,
    open: true,
  };
}

module.exports = config;
