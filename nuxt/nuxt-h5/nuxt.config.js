let  processEnvTarget = 'http://lyaiserver.vipgz6.idcfengye.com';
const webpack = require('webpack')
// import $ from 'jquery'
export default {
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-h5-seo',
    htmlAttrs: {
      lang: 'zh-CN'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', type: 'text/css', href: 'bootstrap/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css' },
    ],
    script: [
      { src: 'https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js' },
      // { src: 'node_modules/js/bootstrap.min.js' },
      { src: 'https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js' },
      // { src: 'bootstrap/js/bootstrap.min.js' }
  ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // '~/assets/scss/all.scss'
  ],
  // bootstrapVue: {
  //   icon: true,
  //   bootstrapCss: false,
  //   bootstrapVueCss: false
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/common.js', ssr: false },
    { src: '~/plugins/initial.css', ssr: true },
    // { src: '~/plugins/bootstrap/css/bootstrap.min.css', ssr: true },
    // { src: '~/plugins/bootstrap/js/bootstrap.min.js', ssr: false },
    // { src: "~/plugins/axios/axios.js", ssr: false },
    // { src: "~/plugins/axios/request.js",ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/proxy',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: processEnvTarget,
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  server: {
    port: '50913',
    host: '0.0.0.0'
  },
  build: {
    plugins: [
     new webpack.ProvidePlugin({
       '$': 'jquery'
     })
   ]
  }
}
