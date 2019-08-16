import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import introduce_pc from '@/pages/introduce_pc'
import introduce_wap from '@/pages/introduce_wap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/introduce_pc',
      name: 'introduce_pc',
      component: introduce_pc
    },
    {
      path: '/introduce_wap',
      name: 'introduce_wap',
      component: introduce_wap
    }
  ]
})
