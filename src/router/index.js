import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Icon from 'vue-awesome/components/Icon'

Vue.use(Router)
Vue.use(Meta)
Vue.component('icon', Icon)

export default new Router({
  mode: 'history',
  routes: []
})
