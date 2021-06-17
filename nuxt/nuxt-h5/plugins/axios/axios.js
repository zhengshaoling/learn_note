import axios from 'axios'
// import router from '@/router'
// import store from '~/store'
const BASE_URL = '/api'
if(process.env.ENV == 'test') {

}
if(process.env.ENV == 'production') {

}
const SUCCESS_STATUS = 200;

const service = axios.create({
  baseURL: BASE_URL, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers['contentype'] = 'application/json';
    return config
  },
  error => {
    console.log('err' + error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== SUCCESS_STATUS) {
      return Promise.reject(res)
    } else {
      if(res.data) return Promise.resolve(response.data.data)
      else return true;
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
