import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Buefy from 'buefy'
import Icon from 'vue-awesome/components/Icon'
import Artifact from '@/components/artifact'
import Hero from '@/components/hero'

Vue.use(Router)
Vue.use(Meta)
Vue.use(Buefy, {defaultIconPack: 'fas'})
Vue.component('icon', Icon)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/hero'
    },
    {
      path: '/artifact',
      name: 'artifact',
      component: Artifact
    },
    {
      path: '/hero',
      name: 'hero',
      component: Hero
    }
  ]
})
