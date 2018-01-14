var path = require("path")
var webpack = require("webpack")
var pkg = require("./package.json")

module.exports = {
  cache: true,
  entry: {
    index: ['./src/index.js'],
    vendor: Object.keys(pkg.dependencies),
  },
  output: {
    path: path.resolve("bin"),
    publicPath: "/bin/",
    filename: 'index.bundle.js'
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: [path.resolve("src")],
      query: {
        cacheDirectory: true
      }
    }]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: "vendor", filename: "vendor.bundle.js"})
  ]
 }