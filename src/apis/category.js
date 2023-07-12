import request from '@/utils/http'

export const findTopCategoryAPI = (id) => {
    return request({
        url: '/category',
        params: {
            id
        }
    })
}