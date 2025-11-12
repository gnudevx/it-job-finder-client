const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@viewmodels': path.resolve(__dirname, 'src/viewmodels'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@routers': path.resolve(__dirname, 'src/routers'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/views/layouts'),
      '@pages': path.resolve(__dirname, 'src/views/pages'),
      '@api': path.resolve(__dirname, 'src/api'),
    },
  },
};
