import Vue from 'vue'
import Router from 'vue-router'
import pc from '@/pages/pc'
import wap from '@/pages/wap'
import topic from '@/pages/pc/topic.vue'
import main from '@/pages/pc/main.vue'
import user from '@/pages/pc/user.vue'
import getstart from '@/pages/pc/getstart.vue'
import api from '@/components/api.vue'
import reference from '@/pages/pc/reference.vue'
import login from '@/components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/pc',
      component: pc,
      children: [
        {
          path: '',
          component: main
        },
        {
          path: 'detail/:id',
          component: topic
        },
        {
          path: 'user/:loginname',
          component: user
        },
        {
          path: 'getstart',
          component: getstart
        },
        {
          path: 'api',
          component: api
        },
        {
          path: 'reference',
          component: reference
        },
        {
          path: 'login',
          component: login
        }
        
      ]
    },
    {
      path: '/wap',
      name: 'wap',
      component: wap
    }

  ]
})
