<template>
  <div class="columns" id="artifact-options">
    <div class="column">
      <div class="field">
        <div class="control is-expanded">
          <div class="select is-fullwidth">
            <select v-model="item" @change="itemChange">
              <option v-for="equip in equips" :key="equip" :value="equip">{{ equip }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-narrow">
      <star-selector/>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import StarSelector from '@/components/common/StarSelector.vue'

export default {
  name: 'artifact-options',
  components: {
    'star-selector': StarSelector
  },
  computed: {
    ...mapGetters([
      'equips'
    ]),
    item: {
      get () {
        return this.$store.state.item
      },
      set (newItem) {
        this.$store.commit('itemChange', newItem)
      }
    }
  },
  methods: {
    itemChange: function (e) {
    }
  }
}
</script>
