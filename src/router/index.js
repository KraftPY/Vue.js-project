import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "CustomerList",
    component: () => import("../views/CustomerList.vue")
  },
  {
    path: "/edit",
    name: "EditForm",
    component: () => import("../views/EditForm.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
