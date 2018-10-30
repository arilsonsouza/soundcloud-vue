import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Search from '@/views/Search'
import PageNotFound from '@/views/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/search/:query', name: 'search', component: Search },
    { path: '*', component: PageNotFound }
  ]
})
