//管理用户数据相关
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from '@/apis/user'
import { mergeCartListAPI } from '@/apis/cart'
import { useCartStore } from './cartStore'
 
export const useUserStore = defineStore('user', 
    () => {
        const cartStore = useCartStore()
        // 定义管理用户数据的state
        const userInfo = ref({})
        // 定义获取接口数据的action函数
        const getUserInfo = async ({ account, password }) => {
            const res = await loginAPI({ account, password })
            userInfo.value = res.result
            // 或手动存储到localstorage
            // localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
            // 合并购物车
            mergeCartListAPI(cartStore.cartList.map(item => {
                return {
                    skuId: item.skuId,
                    selected: item.selected,
                    count: item.count
                }
            }))
            cartStore.updateNewList()
            console.log(cartStore.cartList);
        }

        const clearUserInfo = () => {
            userInfo.value = {}
            // 执行清除购物车操作
            cartStore.cartList = []
        }
        // 以对象的格式把state和action return
        return {
            userInfo,
            getUserInfo,
            clearUserInfo
        }
    },
    // pinia持久化
    {
        persist: true
    }
)

