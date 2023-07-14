<template>
    <el-carousel height="500px">
        <el-carousel-item v-for="item in goods" :key="item.id">
            <img :src="item.imgUrl" alt="">
        </el-carousel-item>
    </el-carousel>
</template>

<script setup>
defineProps({
    goods: {
        type: Object,
        default: () => { }
    }
})

</script>

<style lang="scss" scoped>

</style>