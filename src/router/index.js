import { createRouter, createWebHistory } from 'vue-router'

//路由懒加载
const Login = () => import('@/views/Login/index.vue')
const Layout = () => import('@/views/Layout/index.vue')
const Home = () => import('@/views/Home/index.vue')
const Category = () => import('@/views/Category/index.vue')
const SubCategory = () => import('@/views/SubCategory/index.vue')
const Detail = () => import('@/views/Detail/index.vue')
const CartList = () => import('@/views/CartList/index.vue')
const Checkout = () => import('@/views/Checkout/index.vue')
const Pay = () => import('@/views/Pay/index.vue')
const PayCallback = () => import('@/views/PayCallback/index.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          //默认渲染页
          path: '',
          component: Home
        },
        {
          path: 'category/:id',
          component: Category
        },
        {
          path: 'category/sub/:id',
          component: SubCategory
        },
        {
          path: 'detail/:id',
          component: Detail
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: Checkout
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          component: PayCallback
        }
      ]
    },
    {
      path: '/login',
      component: Login
    }
  ],
  //路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
