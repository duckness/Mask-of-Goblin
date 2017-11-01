<template>
  <div id="hero-description">
    <article class="media" id="hero">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="heroImage">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <span>
              <strong class="title is-3">{{ item }} </strong>
              <small class="subtitle is-5">({{ hero.class }})</small>
            </span>
            <br>
            <small class="subtitle is-5">{{ hero.subtitle }}</small>
            <br>{{ hero.description }}
            <br>
            <div class="columns">
              <div class="column content">
                <label class="label no-margin-bottom">T5 Light</label>
                <span>{{ hero.t5.light }}</span>
              </div>
              <div class="column content">
                <label class="label no-margin-bottom">T5 Dark</label>
                <span>{{ hero.t5.dark }}</span>
              </div>
            </div>
          </p>
        </div>
      </div>
    </article>
    <skill :skill="hero.s1"/>
    <skill :skill="hero.s2"/>
    <skill :skill="hero.s3"/>
    <skill :skill="hero.s4"/>
    <article class="media" id="uw">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="itemImage">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <small class="subtitle is-6">Unique Weapon</small>
            <br>
            <strong class="title is-5">{{ itemName }} </strong>
            <small class="subtitle is-6">{{ attack }}</small>
            <br> {{ description }}
            <div class="content is-small" v-if="additionalInfo !== ''">
              <strong class="is-6">Notes</strong>
              <br>
              <span>{{ additionalInfo }}</span>
            </div>
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
import Skill from './Skill.vue'

export default {
  name: 'hero-description',
  components: {
    'skill': Skill
  },
  computed: {
    ...mapState([
      'item'
    ]),
    ...mapGetters({
      hero: 'getHero'
    }),
    ...mapGetters([
      'itemImage',
      'itemName',
      'attack',
      'description',
      'additionalInfo'
    ]),
    heroImage: function () {
      return require('./images/icon/' + this.item + '.png')
    }
  }
}
</script>
