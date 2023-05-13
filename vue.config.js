const path = require('path')
function load(url) {
  return path.resolve(__dirname, url)
}

const isProd = process.env.VUE_APP_ENV === 'production'
module.exports = {
  chainWebpack: (config) => {
    config.when(isProd, (config) => {
      config.entry('app').clear().add('./src/main.prod.js')
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ElementUI'
      })
      config.plugin('html').tap((args) => {
        args[0].isProd = true
        return args
      })
    })
    config.when(!isProd, (config) => {
      config.entry('app').clear().add('./src/main.dev.js')
      config.plugin('html').tap((args) => {
        args[0].isProd = false
        return args
      })
    })
    config.resolve.alias
      .set('@components', load('./src/components'))
      .set('@css', load('./src/assets/css'))
      .set('@components', load('./src/components'))
      .set('@views', load('./src/views'))
      .set('@mixins', load('./src/mixins'))
      .set('@plugins', load('./src/plugins'))
      .set('@static', load('./src/static'))
      .set('@utils', load('./src/utils'))
      .set('@api', load('./src/api'))
      .set('@mock', load('./src/mock'))
      .set('@store', load('./src/store'))
  },
  devServer: {
    // port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8088/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 路径重写
        }
      }
    }
  }
  // configureWebpack: {
  //   devtool: '#eval-source-map'
  // },
}
