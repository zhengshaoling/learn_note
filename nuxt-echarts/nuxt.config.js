/*
 * @Author: your name
 * @Date: 2021-04-01 10:27:39
 * @LastEditTime: 2021-09-17 09:46:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nuxt-seo\nuxt.config.js
 */
let ENV_BASE_API = 'http://10.88.20.14:8523/'; // 请求路径
let BASE_IMG_PATH = '/img/' // 静态图片资源
// 测试环境
if(process.env.NODE_ENV == 'test') {
  ENV_BASE_API = '';
}
// 生产环境
if(process.env.NODE_ENV == 'prod') {
  ENV_BASE_API = '' ;
}
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
    'assets/css/common.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/warmPop',
    '@/plugins/zButton',
    { src: '~/plugins/common.js', ssr: false }, // 全局配置入口，该文件中的配置在服务端不生效
    { src: "~/plugins/axios/request.js",ssr: true },
    { src: '~/plugins/lib/util', ssr: true }, // 用于注册公用方法
    { src: '~/plugins/lib/protoFun', ssr: true }, // 用于增加原型方法
    { src: '~/plugins/lib/echartUtil', ssr: true }, // 定义echart方法

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
    proxy: true
  },
  
  server: {
    port: 8523,
    host: '0.0.0.0'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    vendor: ['axios']
  }
}
