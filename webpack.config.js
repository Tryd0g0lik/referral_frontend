const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
module.exports = {
  entry: './src/index.ts',
  mode: 'none',
  output: {
    path: path.resolve(__dirname, '../referral/static'), // '../static'
    filename: 'scripts/main-[id]-[fullhash].js',
    publicPath: '/',
    clean: true
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: {
              removeComments: false, // Не удалять комментарии
              collapseWhitespace: false, // Не сворачивать пробелы
            },
          },
        },
      },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ],
      // },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',

        ],

      },
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
          path.resolve(__dirname, "node_modules")
        ]
      },

    ]
  },

  plugins: [
    new Dotenv({
      path: ".env"
    }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/',
      writeToFileEmit: true
    }),
    new BundleTracker({
      path: path.join(__dirname, 'src/bundles'),
      filename: 'webpack-stats.json'
    }),

    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: '../templates/index.html',
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/login.html',
      filename: '../templates/users/login.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/register.html',
      filename: '../templates/users/register.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/password_change.html',
      filename: '../templates/users/password_change.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/profile_change.html',
      filename: '../templates/users/profile_change.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/profile_delete.html',
      filename: '../templates/users/profile_delete.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/referral_code.html',
      filename: '../templates/users/rreferral_code.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/token_repeat.html',
      filename: '../templates/users/token_repeat.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/register.html',
      filename: '../templates/users/register.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/layout/basis.html',
      filename: '../templates/layout/basis.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/users/profile.html',
      filename: '../templates/users/profile.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/style.css'
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   test: /\.tsx?$/,
    //   filename: '../referral/maps/[file].map.[query]',
    //   include: path.resolve(__dirname, 'src/'),
    // }),

    new ESLintPlugin({
      files: path.resolve(__dirname, 'src')

    }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../referral/static'),

    },
    watchFiles: [
      'scripts',
    ],
    hot: true,
    liveReload: true,
    historyApiFallback: true,
    port: 5001
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "./.browserslistrc"),
      path.resolve(__dirname, "node_modules")
    ],

    alias: {
      "@Interfaces": [
        path.resolve(__dirname, "./src/interfaces.ts")
      ],
    }
  },

};

