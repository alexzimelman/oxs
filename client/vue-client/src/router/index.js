import Vue from 'vue'
import Router from 'vue-router'
import Tenants from '@/components/Tenants'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'

Vue.use(Router)
Vue.use(BootstrapVue)
Vue.prototype.$axios = axios
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tenants',
      component: Tenants
    }
  ]
})
