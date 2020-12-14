import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '@/vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
      path: "a", //子路由前面不加斜杠
      component: {
        render(h){
          return <h1> about a </h1>
        }
      }
    },{
      path: "b", //子路由前面不加斜杠
      component: {
        render(h){
          return <h1> aboutb </h1>
        }
      }
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
