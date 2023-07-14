<template>
    <div class="container">
        <!-- 面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/category/${ subCategory.parentId }`}">{{ subCategory.parentName }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ subCategory.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs v-model="reqData.sortField" @tab-change="tabChange" :infinite-scroll-disabled="disabled">
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <ul class="body" v-infinite-scroll="load">
                <!-- 商品列表 -->
                <GoodsItem v-for="good in goodList" :key="good.id" :goods="good"/>
            </ul>
        </div>
    </div>
</template>

<script setup>
import GoodsItem from '../Home/components/GoodsItem.vue'
import { useCategoryFilter } from "./composables/useCategoryFilter"
import { useSubCategory } from './composables/useSubCategory'
import { getSubCategoryAPI } from '@/apis/category'
import { ref } from 'vue'

const { subCategory } = useCategoryFilter()
const { goodList, reqData, getGoodList } = useSubCategory()
const disabled = ref(false)

//tab切换回调
const tabChange = () => {
    // console.log(reqData.value.sortField);
    reqData.value.page = 1
    getGoodList(reqData)
}

//无限滚动加载
const load = async () => {
    // 获取下一页的数据
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    // console.log(res);
    // 解构数组放入原数组
    goodList.value.push(...res.result.items)
    // goodList.value = [...goodList.value, ...res.result.items]
    // 加载完毕， 停止监听
    if(res.result.items.length === 0) {
        disabled.value = true
    }
}

</script>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>