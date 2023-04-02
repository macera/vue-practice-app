import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Blogs from '../views/Blogs.vue'
import Blog from '../views/Blog.vue'
import EditBlog from '../views/EditBlog.vue'
import Amounts from '../views/Amounts.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: Blogs
  },
  {
    path: '/blogs/:id',
    name: 'show-blog',
    component: Blog,
    params: true
  },
  {
    path: '/blogs/:id/edit',
    name: 'edit-blog',
    component: EditBlog,
    params: true
  },
  {
    path: '/amounts',
    name: 'amounts',
    component: Amounts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
