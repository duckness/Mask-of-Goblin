<template>
  <div id="app">
    <section class="section" id="content">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-three-quarters">
            <div class="box">
              <artifact-description v-if="page === 'artifact'"/>
              <hero-description v-if="page === 'hero'"/>
              <br>
              <label class="label">Select:</label>
              <page-selector/>
              <artifact-options v-if="page === 'artifact'"/>
              <hero-options v-if="page === 'hero'"/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <mog-footer/>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import PageSelector from './components/PageSelector.vue'
import ArtifactDescription from './components/artifact/Description.vue'
import ArtifactOptions from './components/artifact/Options.vue'
import HeroDescription from './components/hero/Description.vue'
import HeroOptions from './components/hero/Options.vue'
import MogFooter from './components/MogFooter.vue'

require('./style.scss')

const siteTitle = 'King\'s Raid Gear'
const siteDesc = 'A quick Artifact and Unique Weapon viewer for King\'s Raid'

export default {
  name: 'app',
  components: {
    'page-selector': PageSelector,
    'artifact-description': ArtifactDescription,
    'artifact-options': ArtifactOptions,
    'hero-description': HeroDescription,
    'hero-options': HeroOptions,
    'mog-footer': MogFooter
  },
  computed: {
    ...mapGetters([
      'itemImage',
      'itemName',
      'description'
    ]),
    page: {
      get () {
        return this.$store.state.page
      },
      set (newPage) {
        this.$store.commit('pageChange', newPage)
      }
    },
    rootUrl: function () {
      if (window.location.port === '') {
        return window.location.protocol + '//' + window.location.hostname
      } else {
        return window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
      }
    },
    metaTitle: function () {
      if (Object.keys(this.$route.query).length === 0) {
        return siteTitle
      } else {
        return this.itemName
      }
    },
    metaDesc: function () {
      if (Object.keys(this.$route.query).length === 0) {
        return siteDesc
      } else {
        return this.description
      }
    },
    metaImage: function () {
      if (Object.keys(this.$route.query).length === 0) {
        return this.rootUrl + require('./components/artifact/images/Mask of Goblin.png')
      } else {
        return this.rootUrl + this.itemImage
      }
    }
  },
  metaInfo: function () {
    return {
      title: siteTitle,
      link: [
        { rel: 'shortcut icon', type: 'image/png', href: '/static/favicon.png' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'TRAPPED' },
        { name: 'description', content: siteDesc },
        { name: 'keywords', content: 'Kings,King\'s,Raid,Artifact,Unique,Weapon,Armor,UW' },
        { property: 'og:title', content: this.metaTitle },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:image', content: this.metaImage },
        { property: 'og:description', content: this.metaDesc }
      ]
    }
  }
}
</script>
