<template>
  <article class="media" :id="skillNum">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="skillIcon">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong class="title is-5">{{ skill.name }}</strong>
          <br>{{ skill.description }}
          <div class="content is-small" v-if="'moreInfo' in skill">
            <strong class="is-6">Notes</strong>
            <br>
            <span>{{ skill.moreInfo }}</span>
          </div>
        </p>
        <p>
          <span v-if="'mana' in skill">
            <strong>Mana Cost: </strong>
            <span class="orbs" v-if="skill.mana > 0"><orb v-for="orb in numOrbs" :key="orb"/></span>
            <span v-else>0</span>
          <br></span>
          <span v-if="'cooldown' in skill"><strong>Cooldown: </strong>{{ skill.cooldown }}s <span v-if="'cdstart' in skill">({{ skill.cdstart }})</span><br></span>
          <span v-if="'buff' in skill"><strong>Buff Time: </strong>{{ skill.buff }}s<br></span>
          <span v-if="'debuff' in skill">
            <span v-if="isNaN(skill.debuff)"><strong>Debuff: </strong>{{ skill.debuff }}</span>
            <span v-else><strong>Debuff Time: </strong>{{ skill.debuff }}s</span>
            <br>
          </span>
          <span v-if="'tick' in skill"><strong>Tick Timer: </strong>{{ skill.tick }}s <span v-if="'tickInfo' in skill">({{ skill.tickInfo }})</span><br></span>
          <span v-if="'animation' in skill"><strong>Animation Time: </strong>{{ skill.animation }}s<br></span>
          <span v-if="'cast' in skill"><strong>Castbar Time: </strong>{{ skill.cast }}s<br></span>
          <span v-if="'freeze' in skill"><strong>Freeze Time: </strong>{{ skill.freeze }}s<br></span>
          <span v-if="'castRange' in skill"><strong>Max Cast Range: </strong>{{ skill.castRange }} <span v-if="'castRangeType' in skill">({{ skill.castRangeType }})</span><br></span>
          <span v-if="'skillRange' in skill"><strong>Skill Range: </strong>{{ skill.skillRange }} <span v-if="'skillRangeType' in skill">({{ skill.skillRangeType }})</span><br></span>
          <span v-if="'aoe' in skill"><strong>Skill AOE: </strong>{{ skill.aoe }} <span v-if="'aoeInfo' in skill">({{ skill.aoeInfo }})</span><br></span>
        </p>
        <p v-if="skill.num !== 'Special'">
          <div v-if="skill.num !== 'Special'" class="columns">
            <div class="column content">
              <label class="label no-margin-bottom">Books</label>
              <ol class="no-margin-ol">
                <li v-for="book in skill.books" :key="book">{{ book }}</li>
              </ol>
              <div class="content is-small" v-if="'bookInfo' in skill">
                <strong class="is-6">Notes</strong>
                <br>
                <span>{{ skill.bookInfo }}</span>
              </div>
            </div>
            <div class="column content">
              <p>
                <label class="label no-margin-bottom">T{{ transcendenceNum }} Light</label>
                <span>{{ skill.transcendence.light }}</span>
              </p>
              <div class="content is-small" v-if="'lightInfo' in skill.transcendence">
                <strong class="is-6">Notes</strong>
                <br>
                <span>{{ skill.transcendence.lightInfo }}</span>
              </div>
            </div>
            <div class="column content">
              <p>
                <label class="label no-margin-bottom">T{{ transcendenceNum }} Dark</label>
                <span>{{ skill.transcendence.dark }}</span>
              </p>
              <div class="content is-small" v-if="'darkInfo' in skill.transcendence">
                <strong class="is-6">Notes</strong>
                <br>
                <span>{{ skill.transcendence.darkInfo }}</span>
              </div>
            </div>
          </div>
        </p>
      </div>
    </div>
  </article>
</template>

<script>

import { mapState } from 'vuex'
import Orb from './Orb.vue'

export default {
  name: 'skill',
  props: ['skill'],
  components: {
    'orb': Orb
  },
  computed: {
    ...mapState([
      'item'
    ]),
    skillNum: function () {
      return 'skill' + this.skill.num
    },
    skillIcon: function () {
      return require('./images/skill/' + this.item + '/s' + this.skill.num + '.png')
    },
    numOrbs: function () {
      return Array(this.skill.mana).fill(0)
    },
    transcendenceNum: function () {
      // s2, s4 are T3
      if (this.skill.num % 2 === 0) {
        return 3
      } else {
        return 4
      }
    }
  }
}
</script>
