const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  entry: {
    code: './src/code.ts',
    ui: './src/app/ui.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.*/]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  output: {
    filename: '[name].js?[contenthash]',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
  },
});
