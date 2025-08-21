const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@asset': path.resolve(__dirname, 'src/assets'),
      '@view': path.resolve(__dirname, 'src/views'),
      '@viewmodel': path.resolve(__dirname, 'src/viewmodels'),
      '@model': path.resolve(__dirname, 'src/models'), // hoặc 'services'
      '@router': path.resolve(__dirname, 'src/routers'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/views/layouts'),
      '@pages': path.resolve(__dirname, 'src/views/pages'),
    },
  },
};
