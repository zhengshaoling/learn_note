import axios from "axios"
const base = '/api/service';

axios.interceptors.response.use(response => {
  const res = response.data
  if (res.code === '0') {
    return res;
  } else {
    return res;
  }
})

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
};

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

