const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const pkg = require('./package.json')

const banner = '/*!\n' +
  ` * ${pkg.name} v${pkg.version}\n` +
  ` * © 2020-${new Date().getFullYear()} ${pkg.author}<mxnstrive@gmail.com>\n` +
  ` * Released under the ${pkg.license} License.\n` +
  ' */'

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vue-data-dict.js',
    library: 'VueDataDict',
    libraryExport: 'default',
    libraryTarget: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    'vue': 'Vue',
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new webpack.BannerPlugin({
        banner,
        raw: true,
        entryOnly: true,
      }),
    ],
  },
}
