module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    'index': {
      entry: './src/main.js',
      template: 'public/login.html',
      title: 'Login',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    'projects': {
      entry: './src/pages/projects/main.js',
      template: 'public/projects.html',
      title: 'Projects',
      chunks: ['chunk-vendors', 'chunk-common', 'projects']
    },
    'create': {
      entry: './src/pages/create/main.js',
      template: 'public/create.html',
      title: 'Create Course',
      chunks: ['chunk-vendors', 'chunk-common', 'create']
    },
  }
}
