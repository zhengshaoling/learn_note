import Vue from 'vue'
let vue = new Vue();

import { Message, Notification } from 'element-ui'

export default function ({store, redirect, req, router, app: { $axios }})  {
  // 数据访问前缀
  $axios.defaults.baseURL = 'http://10.10.31.60:8080';

  // request拦截器
  $axios.onRequest(
    config => {
      return config;
    },
    error => {
      Promise.reject(error)
    }
  );
  // response拦截器，数据返回后，可以先在这里进行一个简单的判断
  $axios.interceptors.response.use(
    res => {
      const ERR_OK = 0,LOGOUT = 3;
      const { code, data } = res.data;
      if (code === ERR_OK) {
        return res
      } else {
        if (code == -55) {
          // location.href = '/offline.html';
          return;
        };
        if (code == -95 || code == LOGOUT ) {
          vue.$message.warning("登录信息失效,请重新登录");
          // setTimeout(()=>{
          //     window.location.href = '/?callback='+encodeURIComponent(location.href);
          // },1500)
          return;
        };
        if (code == -99) {
          vue.$message.warning(res.data.message)
          window.location.href = '/'
          return;
        };
        vue.$message.warning(res.data.message);
        return res
      }
    },
    error => {
      vue.$message.warning('服务器异常，请联系管理员');
      return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
  )
}
