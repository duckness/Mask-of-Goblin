<template>
  <b-autocomplete
    v-model="name"
    :data="filteredDataArray"
    :open-on-focus="true"
    :placeholder="getPlaceholder"
    pack="fas"
    icon="search"
    @select="option => itemID = option">
    <template slot="empty">-</template>
  </b-autocomplete>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'NavSearch',
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapGetters([
      'getArtifactList',
      'getHeroList'
    ]),
    itemID: {
      get () {
        switch (this.$route.name) {
          case '':
          case 'hero':
            return this.$store.state.heroID
          case 'artifact':
            return this.$store.state.artifactID
        }
      },
      set (newID) {
        if (newID !== null) {
          switch (this.$route.name) {
            case 'hero':
              this.$store.commit('setHeroID', this.getHeroList[newID])
              break
            case 'artifact':
              this.$store.commit('setArtifactID', this.getArtifactList[newID])
              break
          }
        }
      }
    },
    itemList: function () {
      switch (this.$route.name) {
        case 'hero':
          return Object.keys(this.getHeroList).sort()
        case 'artifact':
          return Object.keys(this.getArtifactList).sort()
      }
    },
    getPlaceholder: function () {
      return this.itemList[0]
    },
    filteredDataArray: function () {
      return this.itemList.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(this.name.toLowerCase()) >= 0
        )
      })
    }
  }
}
</script>
