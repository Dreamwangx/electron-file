import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import layout from '@/components/layout/Index.vue'
//路由一定要使用hash模式
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: layout,
      redirect: '/index',
      children: [
        {
          path: '/index',
          component: () => import('@/views/Index.vue'),
          name: 'Index',
          meta: { title: '首页', icon: 'dashboard', affix: true }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
