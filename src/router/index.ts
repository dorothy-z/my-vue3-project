import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import communication from './communication'

// import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/liquidFill', 
    name: 'liquidFill',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "liquidFill" */ '../views/liquidFill.vue')   // 水球图
  },
  {
    path: '/tesseract',
    name: 'tesseract',
    component: () => import(/* webpackChunkName: "tesseract" */ '../views/Tesseract.vue')   // 图片识别文字
  },
  {
    path: '/searchText',
    name: 'searchText',
    component: () => import(/* webpackChunkName: "searchText" */ '../views/SearchText.vue')   // 根据图片上的文字搜索图片
  },
  {
    path: '/vue3SeamlessScroll',
    name: 'vue3SeamlessScroll',
    component: () => import(/* webpackChunkName: "vue3SeamlessScroll" */ '../views/Vue3SeamlessScroll.vue')   // 无缝滚动
  },
  {
    path: '/fileSliceUpload',
    name: 'fileSliceUpload',
    component: () => import(/* webpackChunkName: "vue3SeamlessScroll" */ '../views/FileSliceUpload.vue')   // 文件切片上传
  },
  // 组件通信
  ...communication
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
