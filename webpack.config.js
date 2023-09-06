const path = require('path');

module.exports = {
  entry: './index.js', // Your entry file
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist') // Output directory
  }
};
