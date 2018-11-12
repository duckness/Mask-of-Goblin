<template>
  <div>
    <herodesc
      :hero="hero"
      class="hero-section"
    />
    <attributes
      :attributes="hero.attributes"
      :auto="hero.auto"
      class="hero-section"
    />
    <skill
      :num="1"
      :skill="hero.s1"
    />
    <skill
      :num="2"
      :skill="hero.s2"
    />
    <skill
      :num="3"
      :skill="hero.s3"
    />
    <skill
      :num="4"
      :skill="hero.s4"
    />
    <weapon
      :weapon="hero.weapon"
      class="hero-section"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeroDesc from "./HeroDesc.vue";
import Attributes from "./Attributes.vue";
import Skill from "./Skill.vue";
import Weapon from "./Weapon.vue";

export default {
  name: "Hero",
  components: {
    herodesc: HeroDesc,
    attributes: Attributes,
    skill: Skill,
    weapon: Weapon
  },
  computed: {
    ...mapGetters({
      hero: "getHero"
    })
  }
};
</script>

<style>
.media + .media {
  border-top: unset;
  margin-top: unset;
  padding-top: unset;
}
</style>
