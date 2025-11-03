module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@asset': './src/assets',
          '@views': './src/views',
          '@viewmodel': './src/viewmodels',
          '@model': './src/models', // hoặc 'services'
          '@router': './src/routers',
          '@components': './src/views/components',
          '@layout': './src/views/layouts',
        },
      },
    ],
  ],
};
