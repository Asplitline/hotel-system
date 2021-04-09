const path = require('path')
function load (url) {
    return path.resolve(__dirname, url)
}
module.exports = {
    chainWebpack: config => {
        config.when(process.env.NODE_ENV = 'production', conf => {
            config.entry('app').clear().add('./src/main.prod.js')
            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        config.when(process.env.NODE_ENV = 'development', conf => {
            config.entry('app').clear().add('./src/main.dev.js')
            config.plugin('html').tap(args => {
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
    }
}