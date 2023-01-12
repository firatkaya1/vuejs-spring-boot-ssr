const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  filenameHashing:false,
  pages:{
    home:{
      entry:'./src/pages/home/main.js',
      title:'Home',
      assetFileName:'home',
      filename:'home/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    about:{
      entry:'./src/pages/about/main.js',
      title:'About',
      assetFileName:'about',
      filename:'about/index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  },
  outputDir:"../demo/src/main/resources/templates/",
  assetsDir:"../static"
});
