<template>
  <div id="hero-options" class="columns">
    <div class="column"/>
    <div class="column is-narrow">
      <star-selector/>
    </div>
    <div class="column is-3">
      <div class="field has-addons">
        <div class="control">
          <p class="button is-static">{{ $t("ui.level") }}</p>
        </div>
        <div class="control is-expanded">
          <input v-model="level" class="input" type="number">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import StarSelector from '@/components/StarSelector.vue'

export default {
  name: 'HeroOptions',
  components: {
    'star-selector': StarSelector
  },
  computed: {
    level: {
      get () {
        return this.$store.state.level
      },
      set (newlevel) {
        this.$store.commit('levelChange', newlevel)
      }
    }
  }
}
</script>

<style scoped>
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
