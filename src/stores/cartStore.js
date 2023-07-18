import { defineStore } from "pinia"
import { computed, ref } from 'vue'
import { insertCartAPI, delCartAPI, getCartListAPI } from '@/apis/cart'
import { useUserStore } from '@/stores/userStore'

export const useCartStore = defineStore('addCart', 
    () => {
        //购物车列表
        const cartList = ref([])
        // 用户存储store
        const userStore = useUserStore()
        // 判断是否可以登录
        const isLogin = computed(() => userStore.userInfo.token)

        // 更新购物车列表 
        const updateNewList = async () => {
            const res = await getCartListAPI()
            cartList.value = res.result
        }

        //添加购物车
        const addCart = async (goods) => {
            const { skuId, count } = goods
            if(isLogin.value) {
                await insertCartAPI({skuId, count})
                updateNewList()
            } else {
                // 已添加过- count + 1
                // 没有添加过 - 直接push
                // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
                const res = cartList.value.find((item) => goods.skuId === item.skuId)
                if(res) {
                    //找到了
                    res.count += goods.count
                } else {
                    //没找到
                    cartList.value.push(goods)
                }
            }
        }
        
        // 删除购物车商品
        const delCart = async (id) => {
            if(isLogin.value) {
                await delCartAPI([id])
                updateNewList()
            } else {
                // filter过滤
                /* const res = cartList.value.find(item => {
                    return item.skuId === id
                })
                cartList.value = cartList.value.filter(item => {
                    return res !== item
                }) */

                // splice删除
                const idx = cartList.value.findIndex((item) => {
                    id === item.skuId
                })
                cartList.value.splice(idx, 1)
            }
        }
        

        // reduce方法，第一个参数为回调函数，第二个参数为初始值
        // 回调函数内，第一个参数sum为累加值，第二个参数cur为当前值
        // 计算总数量
        const allCount = computed(() => cartList.value.reduce((sum, cur) => sum + cur.count, 0))
        // 计算总价钱
        const allPrice = computed(() => cartList.value.reduce((sum, cur) => sum + cur.count * cur.price, 0))

        // 单选功能
        const singleCheck = (skuId, selected) => {
            // 通过skuId找到要修改的那一项，然后把它的selected修改为传过来的selected
            const item = cartList.value.find((item) => item.skuId === skuId)
            item.selected = selected
        }

        // 全选功能
        const allCheck = (selected) => {
            // 修改列表内全部selected值
            cartList.value.forEach(item => item.selected = selected)
        }

        // 已选择计算总件数
        const checkCount = computed(() => cartList.value.filter(item => item.selected).reduce((sum, cur) => sum + cur.count, 0))
        // 已选择计算总价格
        const checkPrice = computed(() => cartList.value.filter(item => item.selected).reduce((sum, cur) => sum + cur.count * cur.price, 0))
        
        // 是否全选的计算属性
        const isAll = computed(() => cartList.value.every((item) => item.selected))

        // 清空购物车
        const emptyCart = async () => {
            if(isLogin.value) {
                const ids = cartList.value.map(item => {
                    return item.skuId
                })
                await delCartAPI(ids)
                updateNewList()
            } 
            cartList.value = []
        }

        return {
            cartList,
            addCart,
            delCart,
            allCount,
            allPrice,
            singleCheck,
            allCheck,
            checkCount,
            checkPrice,
            isAll,
            emptyCart,
            updateNewList
        }
    },
    {
        persist: true
    }
)