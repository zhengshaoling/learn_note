# nuxt-seo
nuxt 搭一个支持SEO的框架

## Build Setup
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## [nuxt官网](https://www.nuxtjs.cn/guide/installation)，以下是项目初期的基本配置和测试

### 按照官网安装了，选择elementUI,引入SASS,引入axios请求, proxy代理，配置好跨域

### create一个nuxt服务，初始化是localhost打开，可以自己在nuxt.config.js中配下IP地址和端口，这样本地起多个项目的时候不会有端口冲突
```javascript
  server: {
    port: 8523,
    host: '0.0.0.0'
  }
```

### 测试打包 放在http-server 运行成功，
```bash
# 使用配置
http-server -p 3000 -P http://10.10.31.60:8088
```

### 图片访问路径：
1. 配置 baseImgPath 基础路径，本地调试的时候可以写本地的，发布版本或其他可以换成阿里云地址。
2. 如果本地图片是放在assets中的话，写法应该是~/assets/img……
3. 如果本体图片是放在static中的话，写法应该是/img……，nuxt服务会把static目录映射到根目录/下

### 全局注册组件的方法：
plugins配置下公用组件，以及引入common.js, ssr为false表示只在客户端，true表示服务端
```javascript
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/warmPop',
    '@/plugins/zButton',
    { src: '~/plugins/common.js', ssr: false },
    { src: "~/plugins/axios/request.js",ssr: true },
  ],
```
common.js 写法跟单纯用vue框架中main.js写法一样，在里面注册全局组件就好
```javascript   
import Vue from 'vue'
import warmPop from '~/components/common/warmPop.vue'
import zButton from '~/components/common/zButton.vue'
Vue.component('warm-pop', warmPop)
Vue.component('z-button', zButton)
```

### 配置env环境
1. 安装cross-env包，在package.json启动配置里设置参数，如下，根据项目需求配置相关参数：
```json 
"scripts": {
    "dev": "cross-env NODE_ENV=dev nuxt",
    "test": "cross-env NODE_ENV=test nuxt",
    "production": "cross-env NODE_ENV=prod nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate"
  },
```
2、nuxt.config.js中，通过process.env.NODE_ENV获取当前环境的参数，并做相关处理
```javascript
  let ENV_BASE_API = 'http://10.10.31.60:8088'; // 请求路径
  let BASE_IMG_PATH = '/img/' // 静态图片资源
  // 测试环境
  if(process.env.NODE_ENV == 'test') {
    ENV_BASE_API = '';
  }
  // 生产环境
  if(process.env.NODE_ENV == 'prod') {
    ENV_BASE_API = '' ;
  }
```