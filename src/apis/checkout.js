import request from '@/utils/http'

// 结算订单页
export const getCheckoutInfoAPI = () => {
  return request({
    url: '/member/order/pre'
  })
}

// 创建订单
export const createOrderAPI = (data) => {
  return request({
    url: '/member/order',
    method: 'POST',
    data
  })
}

// 生成订单
export const getOrderAPI = (id) => {
  return request({
    url: `/member/order/${id}`
  })
}