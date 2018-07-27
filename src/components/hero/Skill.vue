<template>
  <div>
    <article class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="skill.image">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <strong class="title is-5">{{ skill.name }}</strong>
          <p>{{ skill.description }}</p>
          <p>
            <span v-if="'mana' in skill">
              <strong>Mana Cost: </strong>
              <span class="orbs" v-if="skill.mana > 0"><orb v-for="orb in skill.mana" :key="orb"/></span>
              <span v-else>{{ skill.mana }}</span>
            <br></span>
            <span v-if="'cooldown' in skill"><strong>Cooldown: </strong>{{ skill.cooldown }}s <span v-if="'cdstart' in skill">({{ skill.cdstart }})</span><br></span>
          </p>
            <!--span v-if="'buff' in skill"><strong>Buff Time: </strong>{{ skill.buff }}s<br></span>
            <span v-if="'debuff' in skill">
              <span v-if="isNaN(skill.debuff)"><strong>Debuff: </strong>{{ skill.debuff }}</span>
              <span v-else><strong>Debuff Time: </strong>{{ skill.debuff }}s</span>
              <br>
            </span>
            <span v-if="'tick' in skill"><strong>Tick Timer: </strong>{{ skill.tick }}s <span v-if="'tickInfo' in skill">({{ skill.tickInfo }})</span><br></span>
            <span v-if="'animation' in skill"><strong>Animation Time: </strong>{{ skill.animation }}s<br></span>
            <span v-if="'cast' in skill"><strong>Castbar Time: </strong>{{ skill.cast }}s<br></span>
            <span v-if="'freeze' in skill"><strong>Solo/Freeze Time: </strong>{{ skill.freeze }}s<br></span>
            <span v-if="'castRange' in skill"><strong>Max Cast Range: </strong>{{ skill.castRange }} <span v-if="'castRangeType' in skill">({{ skill.castRangeType }})</span><br></span>
            <span v-if="'skillRange' in skill"><strong>Skill Range: </strong>{{ skill.skillRange }} <span v-if="'skillRangeType' in skill">({{ skill.skillRangeType }})</span><br></span>
            <span v-if="'aoe' in skill"><strong>Skill AOE: </strong>{{ skill.aoe }} <span v-if="'aoeInfo' in skill">({{ skill.aoeInfo }})</span><br></span>
          </p-->
        </div>
      </div>
    </article>
    <article v-if="'linked' in skill" class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <img :src="skill.linked.image">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <strong class="title is-5">{{ skill.linked.name }}</strong>
          <p>{{ skill.linked.description }}</p>
        </div>
      </div>
    </article>
    <article class="media">
      <figure class="media-left">
        <p class="image is-128x128" />
      </figure>
      <div class="media-content">
        <div class="content">
          <div class="columns">
            <div class="column content">
              <label class="label no-margin-bottom">Books</label>
              <ol class="no-margin-ol">
                <li v-for="book in skill.books" :key="book">{{ book }}</li>
              </ol>
            </div>
            <div class="column content">
              <p>
                <label class="label no-margin-bottom">T3 Light</label>
                <span>{{ skill.transcendence.light }}</span>
              </p>
            </div>
            <div class="column content">
              <p>
                <label class="label no-margin-bottom">T3 Dark</label>
                <span>{{ skill.transcendence.dark }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
    <treasure v-if="'treasure' in skill" :treasure="skill.treasure"/>
  </div>
</template>

<script>
import Treasure from "./Treasure.vue";
import Orb from "@/components/svg/Orb.vue";

export default {
  name: "Skill",
  components: {
    treasure: Treasure,
    orb: Orb
  },
  props: {
    skill: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
ul.no-margin-ul {
  margin-top: 0;
  margin-left: 1em;
}
ol.no-margin-ol {
  margin-top: 0;
  margin-left: 1em;
}
</style>
