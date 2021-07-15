import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/page/home'
import See from '@/page/seePhoto'
import cover from "../page/cover";

Vue.use(Router)

export default new Router({
  mode:'history',
  base:'/photo/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path:'/see',
      name:'see',
      component: See
    },
    {
      path:'/cover',
      name:'cover',
      component: cover
    }
  ]
})
