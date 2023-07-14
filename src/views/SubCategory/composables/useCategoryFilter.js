import { getCategoryFilterAPI } from "@/apis/category"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

export const useCategoryFilter = () => {
    const subCategory = ref({})
    const route = useRoute()
    const getSubCategory = async (id) => {
        const res = await getCategoryFilterAPI(id)
        subCategory.value = res.result
    }

    onMounted(() => {
        getSubCategory(route.params.id)
    })


    return {
        subCategory
    }
}