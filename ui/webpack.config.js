const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry:{
    home:'./src/pages/home/main.js',
    about:'./src/pages/about/main.js'
  },
  output: {
    filename: "js/[name]/[name].bundle.js",
    path: path.resolve(__dirname, "../demo/src/main/resources/static/"),
    clean: {
      keep: /css\//, // Keep these assets
    },
  },
  plugins:[new VueLoaderPlugin(), new MiniCssExtractPlugin({filename: "css/[name].bundle.css"}) ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/ ,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext][query]",
        },
      },
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    }
 
}