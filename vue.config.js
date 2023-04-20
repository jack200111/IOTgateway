const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

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
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将/api重写为空字符串
        }
      }
    }
  }
}
