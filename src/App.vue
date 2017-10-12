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
  </section>
</template>

<script>

require('bulma')
const sortKeys = require('sort-keys')

export default {
  name: 'app',
  data: function () {
    return {
      type: 'uw',
      items: null,
      item: 'Kasel',
      oldItem: 'Burning Brazier of Elf',
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
    this.items = sortKeys(jsonItems, {deep: true})
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
          atk = '(' + Math.floor(this.items.uw.weapon[this.item].baseAtk * this.items.uw.starScale[this.star] * this.items.uw.levelScale[this.enhance] / 1000000) + ' atk)'
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
@import "~bulma";
.section {
  background-color: #cccccc;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
}

.centered {
  position: fixed;
  top: 50%;
  transform: translate(0%, -50%);
}

.vertical-align {
  display: flex;
  align-items: center;
}
</style>
