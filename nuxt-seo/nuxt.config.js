export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-seo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/common.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // '@nuxtjs/sass-loader'
    // '@nuxtjs/style-resources',
  ],


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    retry: { retries: 3 },
    //开发模式下开启debug
    debug: process.env._ENV == "production" ? false : true,
    //设置不同环境的请求地址
    baseURL:
      process.env._ENV == "production"
        ? "http://10.10.31.61:8088/service/"
        : "http://10.10.31.61:8088/service/",
    withCredentials: true,
    headers: { 'Content-Type': 'application/json', 'crossDomain': true },
    timeout: 5000,
  },
  proxy: {
    '/api/': {
      static: 'http://localhost:3000',
      pathRewrite: {
        '^/api/': '/'
      }
    }
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
