<template>
  <div>
    <herodesc :hero="hero"/>
    <collapsed :title="'Attributes'"><attributes :attributes="hero.attributes" :auto="hero.auto"/></collapsed>
    <collapsed :title="'Skill 1'"><skill :skill="hero.s1"/></collapsed>
    <collapsed :title="'Skill 2'"><skill :skill="hero.s2"/></collapsed>
    <collapsed :title="'Skill 3'"><skill :skill="hero.s3"/></collapsed>
    <collapsed :title="'Skill 4'"><skill :skill="hero.s4"/></collapsed>
    <weapon :weapon="hero.weapon"/>
    <options/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeroDesc from "./HeroDesc.vue";
import Collapsed from "./Collapsed.vue";
import Attributes from "./Attributes.vue";
import Skill from "./Skill.vue";
import Weapon from "./Weapon.vue";
import Options from "./Options.vue";

export default {
  name: "Hero",
  components: {
    herodesc: HeroDesc,
    collapsed: Collapsed,
    attributes: Attributes,
    skill: Skill,
    weapon: Weapon,
    options: Options
  },
  computed: {
    ...mapGetters({
      hero: "getHero"
    })
  }
};
</script>
