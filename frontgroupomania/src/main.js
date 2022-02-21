import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import Routes from './router/index'
import store from './store'

export const bus = new Vue();


Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  vuetify,
  render: h => h(App),
  store,
  router: router
}).$mount('#app')
