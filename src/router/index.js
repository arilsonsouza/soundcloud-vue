import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Search from '@/views/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // { path: '/home/:genre', name: 'genre', component: Home },
    { path: '/search/:query', name: 'search', component: Search },
    { path: '/:genre?', name: 'home', component: Home },
  ]
})
