<template>
  <section class="section">
    <div id="app">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-thirds">
            <div class="box">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-128x128">
                    <img :src="itemImage">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong class="title is-4">{{ itemName }}</strong>
                      <small class="subtitle is-5">{{ attack }}</small>
                      <br> {{ description }}
                    </p>
                  </div>
                </div>
              </article>
              <br>
              <div class="columns">
                <div class="column">
                  <label class="label">Select your equipment:</label>
                  <div class="field">
                    <div class="control is-expanded">
                      <div class="select is-fullwidth">
                        <select v-model="type" @change="typeChange">
                          <option selected disabled value="">Type</option>
                          <option value="uw">Unique Weapon</option>
                          <option value="artifact">Artifact</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      <div class="field">
                        <div class="control is-expanded">
                          <div class="select is-fullwidth">
                            <select v-model="item" @change="itemChange">
                              <option v-for="equip in equips" :value="equip">{{ equip }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="column is-narrow">
                      <div class="field has-addons">
                        <div class="control">
                          <p class="button is-static">★</p>
                        </div>
                        <div class="control is-expanded">
                          <div class="select is-fullwidth">
                            <select v-model="star" @change="starChange">
                              <option v-for="awakening in starLevel" :value="awakening.value">{{ awakening.text }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="column is-3">
                      <div class="field has-addons">
                        <div class="control">
                          <p class="button is-static">Lv.</p>
                        </div>
                        <div class="control is-expanded">
                          <input class="input" type="number" v-bind:value="enhance" v-on:input="enhanceChange($event.target.value)" :disabled="!(enableLevel)"></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <a href="https://github.com/duckness/Mask-of-Goblin"><img class="icon" src="data:image/svg+xml;charset=UTF-8,<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'/></svg>" /></a>
          </p>
        </div>
      </div>
    </footer>
  </section>
</template>

<script>

require('./style.scss')

export default {
  name: 'app',
  data: function () {
    return {
      type: 'uw',
      items: null,
      item: 'Kasel',
      oldItem: 'Mask of Goblin',
      star: 0,
      enableLevel: true,
      enhance: 0,
      starLevel: [
        { text: 'No Stars', value: 0 },
        { text: '\u2605', value: 1 },
        { text: '\u2605\u2605', value: 2 },
        { text: '\u2605\u2605\u2605', value: 3 },
        { text: '\u2605\u2605\u2605\u2605', value: 4 },
        { text: '\u2605\u2605\u2605\u2605\u2605', value: 5 }
      ]
    }
  },
  created: function () {
    var jsonItems = require('./assets/items.json')
    var sortKeys = require('sort-keys')
    this.items = sortKeys(jsonItems, { deep: true })
  },
  computed: {
    itemImage: function () {
      return require('./assets/' + this.type + '/' + this.item + '.png')
    },
    equips: function () {
      let equips = ''
      switch (this.type) {
        case 'uw':
          equips = Object.keys(this.items.uw.weapon)
          break
        case 'artifact':
          equips = Object.keys(this.items.artifact)
          break
      }
      return equips
    },
    itemName: function () {
      let name = ''
      switch (this.type) {
        case 'uw':
          name = this.items.uw.weapon[this.item].name
          break
        case 'artifact':
          name = this.item
          break
      }
      return name
    },
    attack: function () {
      let atk = ''
      switch (this.type) {
        case 'uw':
          atk = '(' + Math.floor(Math.floor(this.items.uw.starScale[this.star] * this.items.uw.levelScale[this.enhance] / 1000) * this.items.uw.weapon[this.item].baseAtk / 1000) + ' atk)'
          break
        case 'artifact':
          atk = ''
          break
      }
      return atk
    },
    description: function () {
      let itemText = ''
      switch (this.type) {
        case 'uw':
          itemText = this.items.uw.weapon[this.item].description[this.star]
          break
        case 'artifact':
          itemText = this.items.artifact[this.item][this.star]
          break
      }
      return itemText
    }
  },
  methods: {
    typeChange: function () {
      var tempItem = ''
      tempItem = this.item
      this.item = this.oldItem
      this.oldItem = tempItem
      switch (this.type) {
        case 'uw':
          this.enableLevel = true
          break
        case 'artifact':
          this.enableLevel = false
          break
      }
    },
    itemChange: function () {
    },
    starChange: function () {
    },
    enhanceChange: function (enhanceLevel) {
      this.enhance = enhanceLevel
      this.enhanceValidation(enhanceLevel)
    },
    enhanceValidation: function (level) {
      var minLevel = 0
      var maxLevel = 80
      var newLevel = this.numberWithinBounds(minLevel, maxLevel, level)
      if (newLevel !== level) {
        this.enhance = newLevel
      }
    },
    numberWithinBounds: function (min, max, number) {
      return number < min ? min : (number > max ? max : number)
    }
  }
}
</script>

<style>
</style>
