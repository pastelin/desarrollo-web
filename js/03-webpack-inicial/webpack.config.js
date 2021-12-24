const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  
  output: {
    clean: true
  },
  
  module: {
    rules: [
      {
        // test: /\.html$/i,
        // loader: 'html-loader',
        // options: {
        //   attibutes: false,
        // },

        // test: /\.html$/,
        // use: [
        //   {
        //     loader: "html-loader",
        //     options: { minimize: false }
        //   }
        // ]

        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources:false
        }

      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Mi webpack App',
      template: './src/index.html',
      filename: './index.html'
    }),
  ]
}