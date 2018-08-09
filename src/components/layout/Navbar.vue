<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <div class="navbar-item">
        <logo />
      </div>
      <div class="navbar-item">
        <a
          id="github-link"
          href="https://github.com/duckness/Mask-of-Goblin"><icon
            id="github-logo"
            name="brands/github" /></a>
      </div>
      <lang />
      <div
        :class="{ 'is-active':isActive }"
        class="navbar-burger burger"
        @click="isActive = !isActive">
        <span />
        <span />
        <span />
      </div>
    </div>
    <div
      :class="{ 'is-active':isActive }"
      class="navbar-menu">
      <router-link
        :to="heroLink"
        class="navbar-item">
        {{ $t("ui.hero") }}
      </router-link>
      <router-link
        :to="artifactLink"
        class="navbar-item">
        {{ $t("ui.artifact") }}
      </router-link>
      <router-link
        to="/calc"
        class="navbar-item">
        Calc
      </router-link>
      <div
        v-if="!isCalc"
        class="navbar-end">
        <div
          v-if="this.$route.name === 'hero'"
          class="navbar-item is-hidden-tablet">
          <options />
        </div>
        <div class="navbar-item">
          <search />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import "vue-awesome/icons/brands/github";
import { mapState } from "vuex";
import Logo from "@/components/svg/Logo.vue";
import NavLang from "./NavLang.vue";
import NavSearch from "./NavSearch.vue";
import Options from "@/components/hero/Options.vue";

export default {
  components: {
    logo: Logo,
    lang: NavLang,
    search: NavSearch,
    options: Options
  },
  data() {
    return {
      isActive: false,
      name: "",
      selected: null
    };
  },
  computed: {
    ...mapState(["artifactID", "heroID"]),
    artifactLink: function() {
      return "/artifact/" + this.artifactID;
    },
    heroLink: function() {
      return "/hero/" + this.heroID;
    },
    isCalc: function() {
      return this.$route.name === "calc";
    }
  }
};
</script>

<style scoped>
.navbar {
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-bottom: 2px solid rgba(10, 10, 10, 0.1);
}
#github-logo {
  width: auto;
  height: 1.25rem;
  vertical-align: -0.25rem;
}
</style>
