import axios from 'axios'

export function request(config) {
    // 创建 axios 实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000/api/v1',
      timeout: 10000
    })

    // axios 拦截器
    instance.interceptors.request.use(config => {
      return config
    },err => {
      console.log(err)
    })
    instance.interceptors.response

    // 发送真正的网络请求
     return instance(config)
  
}