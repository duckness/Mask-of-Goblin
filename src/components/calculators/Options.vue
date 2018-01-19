<template>
  <div class="columns" id="calc-options">
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
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'calc-options',
  computed: {
    ...mapGetters([
      'equips'
    ]),
    item: {
      get () {
        return this.$store.state.calcItem
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
