import { getCheckoutInfoAPI } from '@/apis/checkout'
import { onMounted, ref } from 'vue'

export const useCheckInfo = () => {
    const checkInfo = ref({})
    const curAddress = ref({})
    const getCheckInfo = async () => {
        const res = await getCheckoutInfoAPI()
        checkInfo.value = res.result
        console.log(checkInfo.value);
        // 适配默认地址
        // 从地址列表中筛选出来  isDefault === 0 那一项
        // 在await后赋值，否则会造成数据未传递回来进而渲染页面为空
        const item = checkInfo.value.userAddresses.find(item => item.isDefault === 0)
        curAddress.value = item
    }
    
    onMounted(() => {
        getCheckInfo()
    })

    return {
        checkInfo,
        curAddress
    }
}

