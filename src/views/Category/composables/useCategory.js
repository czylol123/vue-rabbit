//封装category分类相关的业务代码
import { findTopCategoryAPI } from '@/apis/category'
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

export const useCategory = () => {
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async (id) => {
        // 如何在setup中获取路由参数 useRoute() -> route 等价于this.$route
        const res = await findTopCategoryAPI(id)
        categoryData.value = res.result
    }

    onMounted(() => {
        getCategory(route.params.id)
    })

    //目标：路由参数变化的时候，可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        // 存在问题：使用最新的路由参数请求最新的分类数据
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}