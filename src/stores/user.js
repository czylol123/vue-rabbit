//管理用户数据相关
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from '@/apis/user'
 
export const useUserStore = defineStore('user', 
    () => {
        // 定义管理用户数据的state
        const userInfo = ref({})
        // 定义获取接口数据的action函数
        const getUserInfo = async ({ account, password }) => {
            const res = await loginAPI({ account, password })
            userInfo.value = res.result
            // 或手动存储到localstorage
            // localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
        }

        const clearUserInfo = () => {
            userInfo.value = {}
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

