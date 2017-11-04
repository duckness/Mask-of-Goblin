<template>
  <div class="columns" id="hero-options">
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
    <div class="column is-2">
      <div class="field has-addons">
        <div class="control">
          <p class="button is-static">Lv</p>
        </div>
        <div class="control is-expanded">
          <input class="input" type="number" v-model="level" v-on:input="levelChange"></input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import StarSelector from '@/components/common/StarSelector.vue'

export default {
  name: 'hero-options',
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
    },
    level: {
      get () {
        return this.$store.state.level
      },
      set (newlevel) {
        this.$store.commit('levelChange', newlevel)
      }
    }
  },
  methods: {
    itemChange: function (e) {
    },
    levelChange: function (e) {
    }
  }
}
</script>
