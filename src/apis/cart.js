import request from '@/utils/http'

// 加入购物车
export const insertCartAPI = ({skuId, count}) => {
    return request({
        url: '/member/cart',
        method: 'POST',
        data: {
            skuId,
            count
        }
    })
}

// 删除购物车
export const delCartAPI = (ids) => {
    return request({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}

// 获取购物车列表
export const getCartListAPI = () => {
    return request({
        url: '/member/cart'
    })
}

// 合并本地购物车与服务器购物车
export const mergeCartListAPI = ({skuId, selected, count}) => {
    return request({
        url: '/member/cart/merge',
        method: 'POST',
        data: {
            skuId,
            selected,
            count
        }
    })
}