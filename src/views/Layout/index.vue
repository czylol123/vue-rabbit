<template>
    <LayoutFixed/>
    <LayoutNav/>
    <LayoutHeader/>
    <Router-view></Router-view>
    <LayoutFooter/>
</template>

<script setup>
import LayoutFixed from './components/LayoutFixed.vue';
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import { useCategoryStore } from '@/stores/category';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore();

onMounted(() => {
    categoryStore.getCategory()
})

</script>

<style scoped>

</style>