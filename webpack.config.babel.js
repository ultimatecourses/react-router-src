import path from 'path';
import webpack from 'webpack';
import HtmlPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const config = (env, { mode }) => ({
  target: 'web',
  devtool: 'source-map',
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    clean: true,
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].[contenthash].js',
    path: path.resolve(__dirname, './build'),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ESLintPlugin({
      extensions: ['js'],
    }),
    new HtmlPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    contentBase: 'public',
    watchContentBase: true,
    proxy: {
      '/api': 'http://localhost:5000',
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: true,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false,
      overlay: true,
    },
  },
});

export default config;
