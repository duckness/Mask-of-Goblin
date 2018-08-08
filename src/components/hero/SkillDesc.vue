<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <lazyimg :src="skill.image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong class="title is-5">{{ skill.name }}</strong>
        <p>{{ skill.description }}</p>
        <p>
          <span v-if="'mana' in skill">
            <strong>Mana Cost: </strong>
            <span v-if="skill.mana > 0" class="orbs"><orb v-for="orb in skill.mana" :key="orb"/></span>
            <span v-else>{{ skill.mana }}</span>
          <br></span>
          <span v-if="'cooldown' in skill && skill['cooldown'] !== null"><strong>Cooldown: </strong>{{ skill.cooldown }}s <span v-if="'cdstart' in skill">({{ skill.cdstart }})</span><br></span>
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
</template>

<script>
import LazyImg from "@/components/LazyImg.vue";
import Orb from "@/components/svg/Orb.vue";

export default {
  name: "SkillDesc",
  components: {
    lazyimg: LazyImg,
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
