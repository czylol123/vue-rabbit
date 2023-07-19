import request from '@/utils/http'

export const getAddressAPI = () => {
    return request({
        url: '/member/address'
    })
}