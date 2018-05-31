const webpack = require('webpack');
const path = require('path');
module.exports = {
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],
  entry: {
    main: path.resolve(__dirname, './jsx.tsx')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.scss/, use: ['style', 'css', 'scss'] },
      { test: /\.css$/, use: ['style', 'css'] },
      { test: /\.(png|jpg|jpeg)$/, use: ['url'] },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                'env',
                {
                  targets: {
                    node: '8.10'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss']
  },
  devServer: {
    inline: true,
    port: 3000
    // host:'192.168.199.237'
  }
};
