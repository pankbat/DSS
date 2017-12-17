const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].bundle.css",
  disable: process.env.NODE_ENV === "development"
});
module.exports = {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    extractSass
  ],

  entry: {
    app: './src/index.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    loaders: [
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      { test: /\.(png|jpg)$/, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.woff$/, loader: 'file-loader?name=fonts/[name].[ext]' }
    ]
  }
};