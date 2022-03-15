module.exports = {
  //publicPath: process.env.VUE_APP_STATIC_URL,
  assetsDir: 'static/kondo',
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
    'choice': {
      entry: './src/pages/choice/main.js',
      template: 'public/choice.html',
      title: 'Configure Choice Lists',
      chunks: ['chunk-vendors', 'chunk-common', 'choice']
    },
    'reportlist': {
      entry: './src/pages/reportlist/main.js',
      template: 'public/reportlist.html',
      title: 'Reports List',
      chunks: ['chunk-vendors', 'chunk-common', 'reportlist']
    }
  }
}
