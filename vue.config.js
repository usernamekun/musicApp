const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    proxy:{
      '/api': { 
        target:'http://localhost:3000', 
        pathRewrite:{'^/api':''},
        ws: true,//用于支持websocket
        changeOrigin: true //骗人的   
      }
    }
  },
  configureWebpack: {
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
  // publicPath: './',
  // pages: {
  //   index: {
  //     entry: 'src/main.js',
  //     title:'坤坤音乐'
  //   }
  // }
})
