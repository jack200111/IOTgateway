const { defineConfig } = require('@vue/cli-service')
// const nodeExternals = require('webpack-node-externals')
module.exports = defineConfig({
  transpileDependencies: true
})

// webpack < 5

module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('ini')
      .test(/\.ini$/)
      .use('ini-loader')
      .loader('ini-loader')
      .end()
    // config.node.set('child_process', 'empty')
    // config.node.set('__dirname', true)
    // config.node.set('__filename', true)
    // config.node.set('global', true)
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '' // 将/api重写为空字符串
        }
      }
    }
  }
}
