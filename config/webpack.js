const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '../src/Ads.js'),
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'ccu-ads.min.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        use: ['style-loader', 'css-loader' ],
        test: /\.(css|scss|sass)$/,
      },
    ],
  }
};
