import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ListView',
    name: 'ListView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ListView" */ '../views/ListView.vue')
  },
  {
    path: '/search',
    name: 'search',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter:(to,from,next)=>{
      if(store.state.user.token){
        next()
      }else{
        next()
      }
    },
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta:{showFoot:false}
  },
  {
    path: '/me',
    name: 'me',
    beforeEnter: (to, from, next) => {
      if(store.state.user.token){
        next()
      }else{
        next('/login')
      }
    },
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "me" */ '../views/Me.vue'),
  },
  {
    path: '/musiclist',
    name: 'MusicList',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "MusicList" */ '../views/MusicList.vue')
  },
  {
    path: '/artistlist',
    name: 'artistlist',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "artistlist" */ '../views/artistList.vue')
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "test" */ '../views/test.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
