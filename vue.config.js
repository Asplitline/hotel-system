const path = require('path')

// 定义一个函数，用于获取指定路径的绝对路径
function load(url) {
  return path.resolve(__dirname, url)
}

// 判断是否处于生产环境
const isProd = process.env.VUE_APP_ENV === 'production'
console.log('🚀 ~ file: vue.config.js:7 ~ isProd', isProd)

// 导出配置对象
module.exports = {
  // 链式配置 webpack
  chainWebpack: (config) => {
    // 当处于生产环境时执行以下配置
    config.when(isProd, (config) => {
      // 清除入口点并设置一个新的入口点
      config.entry('app').clear().add('./src/main.prod.js')
      // 配置 terser 压缩选项，将 console.log 去除
      config.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
      // 配置 externals
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ElementUI'
      })
      // 配置 html 插件
      config.plugin('html').tap((args) => {
        args[0].isProd = true
        return args
      })
    })
    // 当处于开发环境时执行以下配置
    config.when(!isProd, (config) => {
      // 清除入口点并设置一个新的入口点
      config.entry('app').clear().add('./src/main.dev.js')
      // 配置 html 插件
      config.plugin('html').tap((args) => {
        args[0].isProd = false
        return args
      })
    })
    // 配置别名
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
  // 配置开发服务器
  devServer: {
    // 设置服务器端口号，默认为 8080
    // port: 8080,
    // 自动打开浏览器
    open: true,
    // 配置浏览器中显示的错误和警告信息
    overlay: {
      warnings: false,
      errors: true
    },
    // 配置代理
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
