var WebpackDevServer = require("webpack-dev-server")
var webpack = require("webpack")
var config = require("./webpack.config.js")

var compiler = webpack(config)

var server = new WebpackDevServer(compiler, {
  //historyApiFallback: true,
  publicPath: config.output.publicPath,
  compress: true,
  noInfo: true,
  stats: { colors: true }
})

server.listen(8080, "0.0.0.0", function() {
  console.log("Starting development server...")
})

compiler.plugin('invalid', function () {
  console.log('Compiling...')
})

compiler.plugin('done', function () {
  console.log('Done!')
})
// server.close()