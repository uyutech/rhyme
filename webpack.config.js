const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLESS = new ExtractTextPlugin('[name].css');
const webpack = require("webpack");

module.exports = {
  entry: {
    common: './src/common/index.js',
    single: './src/single/index.jsx',
    mi_a: './src/single/character/mi_a.png',
    sixia_a: './src/single/character/sixia_a.png',
    hetu_a: './src/single/character/hetu_a.png',
    muhan_a: './src/single/character/muhan_a.png'
  },
  output: {
    path: __dirname + '/www',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './www'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          },
          {
            loader: 'migi-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015'] }
          }
        ]
      },
      {
        test: /\.less$/,
        use: extractLESS.extract([ 'css-loader', 'autoprefixer-loader', 'less-loader' ])
      },
      {
        test: /(\.jpg)|(\.jpeg)|(\.gif)|(\.png)$/,
        use: 'url-loader?limit=10240&name=[path][name].[ext]'
      },
      {
        test: /\.(html?)$/,
        use: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   ENV: JSON.stringify(process.env.NODE_ENV || 'production')
    // }),
    extractLESS
  ],
  resolve: {
    alias: {
      ENV: process.env.NODE_ENV == 'development' ? './development.js' : './production.js',
    },
  },
};
