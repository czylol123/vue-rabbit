import { getSubCategoryAPI } from "@/apis/category"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

export const useSubCategory = () => {
    const goodList = ref([])
    const route = useRoute()
    const reqData = ref({
        categoryId: route.params.id,
        page: 1,
        pageSize: 20,
        sortField: 'publishTime'
    })
    const getGoodList = async (reqData) => {
        const res = await getSubCategoryAPI(reqData.value)
        goodList.value = res.result.items
    }

    onMounted(() => {
        getGoodList(reqData)
    })

    return {
        goodList,
        reqData,
        getGoodList
    }
}