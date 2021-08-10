const rewire = require('rewire')
const defaults = rewire('react-scripts/scripts/build.js') // If you ejected, use this instead: const defaults = rewire('./build.js')
let config = defaults.__get__('config')

config.optimization.splitChunks = false
config.optimization.runtimeChunk = false
delete config.output.chunkFilename
config.output.filename = 'static/js/[name].js'

console.log(config)
