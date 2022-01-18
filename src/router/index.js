import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/parser',
    name: 'parser',
    component: () => import(/* webpackChunkName: "parser-example" */'@/components/parser/example/Index.vue')
  },
  {
    path: '/Preview',
    name: 'Preview',
    component: () => import(/* webpackChunkName: "parser-example" */'@/components/parser/example/Preview.vue')
  },
  {
    path: '/Setting',
    name: 'setting',
    component: () => import(/* webpackChunkName: "parser-example" */'@/components/parser/example/Setting.vue')
  },
  {
    path: '/control',
    name: 'control',
    component: () => import(/* webpackChunkName: "parser-example" */'@/components/parser/example/Control.vue')
  },
  {
    path: '/tinymce',
    name: 'tinymce',
    component: () => import(/* webpackChunkName: "tinymce-example" */'@/components/tinymce/example/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
