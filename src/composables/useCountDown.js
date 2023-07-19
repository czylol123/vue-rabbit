import { computed, ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

export const useCountDown = () => {
    const router = useRouter()
    // 响应式数据
    let timer = null
    const time = ref(0)
    // 格式化时间 为 xx分xx秒
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 开启倒计时函数
    const start = (currentTime) => {
        // 开始倒计时逻辑
        // 核心逻辑的编写：每隔一秒就减1
        time.value = currentTime
        timer = setInterval(() => {
            if(time.value <= 0) {
                ElMessage.warning('支付订单已超时,请重新选购')
                router.push('/')
            } else {
                time.value--
            }
        }, 1000)
    }
    // 组件销毁时清除定时器
    onUnmounted(() => {
        timer && clearInterval(timer)
    })
    return {
        formatTime,
        start
    }
}