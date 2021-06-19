import axios from 'axios'
// import router from '@/router'
import store from '@/store'
const BASE_URL = 'http://192.168.31.112:50913/'
if(process.env.ENV == 'test') {

}
if(process.env.ENV == 'prod') {

}
const service = axios.create({
  baseURL: BASE_URL + '/api/service/', // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = '';
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
    if (res.code !== 0) {
      return res;
    } else {
      return response.data.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
