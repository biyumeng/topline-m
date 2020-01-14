// 用户相关的请求模块
import request from '@/utils/request'

// 获取联系建议
export const getSuggestions = (q) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}
