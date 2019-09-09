import {request} from "./request"

export function getHomeMultidata () {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods (type,page) {
  return request({  
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}
// 这个文件是对网络请求的进一步封装