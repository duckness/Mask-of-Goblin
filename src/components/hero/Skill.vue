<template>
  <div>
    <sect>
      <anchoritem
        :to="skillId"
        :header="3"
      >{{ skillFull }}</anchoritem>
      <skilldesc :skill="skill" />
    </sect>
    <sect v-if="'linked' in skill">
      <anchoritem
        :to="skillId + 'linked'"
        :header="4"
      >Linked</anchoritem>
      <skilldesc :skill="skill.linked" />
    </sect>
    <sect>
      <anchoritem
        :to="skillId + 't3'"
        :header="4"
      >Transcendence 3</anchoritem>
      <transcendence
        :light="skill.transcendence.light"
        :dark="skill.transcendence.dark"
      />
    </sect>
    <sect>
      <anchoritem
        :to="skillId + 'books'"
        :header="4"
      >Books</anchoritem>
      <skillbooks :books="skill.books" />
    </sect>
    <sect v-if="'treasure' in skill">
      <anchoritem
        :to="skillId + 'ut'"
        :header="4"
      >{{ $t('ui.treasure') }}</anchoritem>
      <treasure :treasure="skill.treasure" />
    </sect>
  </div>
</template>

<script>
import HeroSection from "./HeroSection.vue";
import AnchorItem from "@/components/anchor/Item.vue";
import SkillDesc from "./SkillDesc.vue";
import Transcendence from "./Transcendence.vue";
import Skillbooks from "./Skillbooks.vue";
import Treasure from "./Treasure.vue";

export default {
  name: "Skill",
  components: {
    sect: HeroSection,
    anchoritem: AnchorItem,
    skilldesc: SkillDesc,
    transcendence: Transcendence,
    skillbooks: Skillbooks,
    treasure: Treasure
  },
  props: {
    skill: {
      type: Object,
      required: true
    },
    num: {
      type: Number,
      required: true
    }
  },
  computed: {
    skillId: function () {
      return "s" + this.num;
    },
    skillFull: function () {
      return "Skill " + this.num;
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
