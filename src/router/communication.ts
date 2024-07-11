import { RouteRecordRaw } from 'vue-router'

const communicationRoutes: Array<RouteRecordRaw> = [
  {
    path: '/propsCommunication',
    name: 'propsCommunication',
    component: () => import(/* webpackChunkName: "tesseract" */ '../views/communication/par-props.vue')   // 图片识别文字
  },
]

export default communicationRoutes
