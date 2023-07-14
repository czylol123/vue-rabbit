import { getDetailAPI } from '@/apis/detail'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export const useDetail = () => {
    const goods = ref({})
    const route = useRoute()
    const getDetail = async () => {
        const res = await getDetailAPI(route.params.id)
        goods.value = res.result
    }

    onMounted(() => {
        getDetail()
    })

    return {
        goods
    }
}