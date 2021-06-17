import request from './axios'

export const getRequest = (url, params) => {
  return request({
    method: 'get',
    url: `${url}`,
    params: params,
    headers: {
      "Accept": "*/*"
    }
  })
};

export const postRequest = (url, params) => {
  return request({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
};

