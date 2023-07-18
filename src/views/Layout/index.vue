<template>
    <LayoutFixed/>
    <LayoutNav/>
    <LayoutHeader/>
    <!-- 以当前路由完整路径为key的值，给router-view组件绑定 -->
    <!-- key可以用于强制替换一个元素/组件而不是复用它 -->
    <!-- <Router-view :key="$route.fullPath"/> -->
    <RouterView/>
    <LayoutFooter/>
</template>

<script setup>
import LayoutFixed from './components/LayoutFixed.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore();

onMounted(() => {
    categoryStore.getCategory()
})

</script>

<style scoped>

</style>@/stores/categoryStore