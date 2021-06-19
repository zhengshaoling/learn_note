let  processEnvTarget = 'http://10.10.31.60:8088';
// import 'webpack'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-h5',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // {rel: 'stylesheet', type: 'text/css', href: 'node_modules/bootstrap/dist/css/bootstrap.min.css'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/all.scss',
    // 'bootstrap/dist/css/bootstrap.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/common.js', ssr: false },
    { src: '~/plugins/initial.css', ssr: false },
    // { src: "~/plugins/axios/axios.js", ssr: true },
    // { src: "~/plugins/axios/request.js",ssr: true },
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
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // vendor: ['axios', 'jquery', 'bootstrap'],
    // plugins: [
    //   new webpack.providePlugin({
    //     $: 'jquery',
    //     jQuery: 'jquery',
    //     'window.jQuery': 'jquery'
    //   })
    // ]
  }
}
