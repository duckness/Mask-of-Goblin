<template>
  <div class="field" id="page-selector">
    <div class="control is-expanded">
      <div class="select is-fullwidth">
        <select v-model="page" @change="pageChange">
          <option value="hero">Hero</option>
          <option value="artifact">Artifact</option>
          <option value="calc">Calculator</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page-selector',
  computed: {
    page: {
      get () {
        return this.$store.state.page
      },
      set (newPage) {
        this.$store.commit('pageChange', newPage)
      }
    }
  },
  methods: {
    pageChange: function (e) {
    }
  }
}
</script>
