import { defineStore } from "pinia";
import { getCategoryAPI } from '@/apis/category'
import { ref } from 'vue';


export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([])
    const getCategory = async () => {
        const res = await getCategoryAPI()
        categoryList.value = res.result
    }

    return {
        categoryList,
        getCategory
    }
})