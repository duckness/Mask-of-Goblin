<template>
  <div id="hero-description">
    <article class="media" id="hero">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="heroImage">
        </p>
      </figure>
      <div class="media-content">
        <div class="content" v-if="'class' in hero">
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
                <div class="content is-small" v-if="'lightInfo' in hero.t5">
                  <strong class="is-6">Notes</strong>
                  <br>
                  <span>{{ hero.t5.lightInfo }}</span>
                </div>
              </div>
              <div class="column content">
                <label class="label no-margin-bottom">T5 Dark</label>
                <span>{{ hero.t5.dark }}</span>
                <div class="content is-small" v-if="'darkInfo' in hero.t5">
                  <strong class="is-6">Notes</strong>
                  <br>
                  <span>{{ hero.t5.darkInfo }}</span>
                </div>
              </div>
            </div>
          </p>
        </div>
        <div class="content" v-else>
          <strong class="title is-3">{{ item }}</strong>
          <p>Hero data coming soon!</p>
        </div>
      </div>
    </article>
    <collapse is-fullwidth v-if="'class' in hero">
      <collapse-item title="Attributes">
        <attributes :stats="hero.attributes" :hclass="hero.class"/>
      </collapse-item>
      <collapse-item v-if="'s0' in hero" :title="skillTitle(hero.s0)">
        <skill v-if="'s0' in hero" :skill="hero.s0"/>
      </collapse-item>
      <collapse-item :title="skillTitle(hero.s1)">
        <skill :skill="hero.s1"/>
      </collapse-item>
      <collapse-item :title="skillTitle(hero.s2)">
        <skill :skill="hero.s2"/>
      </collapse-item>
      <collapse-item :title="skillTitle(hero.s3)">
        <skill :skill="hero.s3"/>
      </collapse-item>
      <collapse-item :title="skillTitle(hero.s4)">
        <skill :skill="hero.s4"/>
      </collapse-item>
    </collapse>
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
import Collapse from '@/components/vue-bulma-collapse/Collapse.vue'
import Item from '@/components/vue-bulma-collapse/Item.vue'
import Skill from './Skill.vue'
import Attributes from './Attributes.vue'

export default {
  name: 'hero-description',
  components: {
    'skill': Skill,
    'collapse': Collapse,
    'collapse-item': Item,
    'attributes': Attributes
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
  },
  methods: {
    skillTitle: function (skill) {
      return 'Skill ' + skill.num
    }
  }
}
</script>
