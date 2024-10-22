const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
// const { merge } = require("webpack-merge");
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
// const webpackFront = require("./src/frontend/webpack.config.js");

// module.exports = webpackFront, {
module.exports = {
  entry: './src/index.ts',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, '../referral/static/scripts'), // '../static'
    filename: 'main-[id]-[hash].js',
    publicPath: '/',
    clean: true
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, './babel.config.js'),
            }
          },
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),
        ]

      },

    ]
  },

  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/static/scripts/',
      writeToFileEmit: true,
    }),
    new BundleTracker({
      path: path.join(__dirname, 'src/bundles'),
      filename: 'webpack-stats.json'
    }),

    new SpriteLoaderPlugin(), // svg

    new HtmlWebpackPlugin({
      template: 'src/public/index.html' //'../templates/index.html'
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: './dist/maps/[file].map.[query]',
      include: path.resolve(__dirname, 'src/'),
    }),

    new ESLintPlugin({
      files: path.resolve(__dirname, 'src'),

    }),

    // new MiniCssExtractPlugin({
    //   filename: 'css/style.css'
    // }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist/frontend'), // '../static'

    },
    watchFiles: [
      'dist',
    ],
    hot: true, // Включение горячей перезагрузки
    liveReload: true, // Включение live-reload

    // comarticle: true,
    historyApiFallback: true
    // open: true, // Автоматическое открытие браузера
    // port: 8080
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "./.browserslistrc"),
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "dist")
    ],

    alias: {
      "@Interfaces": [
        path.resolve(__dirname, "src/interfaces.ts")
      ],
      "@Components": [
        path.resolve(__dirname, "./src/components")
      ],
      "@Services": [
        path.resolve(__dirname, "./src/services")
      ],
    }
  },

};

