module.exports = {
  entry: './jsx.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'release.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  }
};
