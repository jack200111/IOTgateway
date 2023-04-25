// http://kumanxuan1.f3322.net:8881/cms
import axios from 'axios'

// 是否可以导入？

const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (res) {
  return res
}, function (error) {
  return Promise.reject(error)
})

export default instance
