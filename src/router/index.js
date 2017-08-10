import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import userManagement from '../components/userManagement.vue'
import main from '../components/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: '/',
        name: 'main',
        component: main
      }]
    }
  ]
})