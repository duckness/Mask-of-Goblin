<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <div class="navbar-item">
        <logo/>
      </div>
      <lang/>
      <div :class="{ 'is-active':isActive }" class="navbar-burger burger" @click="isActive = !isActive">
        <span/>
        <span/>
        <span/>
      </div>
    </div>
    <div :class="{ 'is-active':isActive }" class="navbar-menu">
      <router-link :to="heroLink" class="navbar-item">
        {{ $t("ui.hero") }}
      </router-link>
      <router-link :to="artifactLink" class="navbar-item">
        {{ $t("ui.artifact") }}
      </router-link>
      <router-link to="/calc" class="navbar-item">
        Calc
      </router-link>
      <div v-if="!isCalc"  class="navbar-end">
        <div class="navbar-item">
          <search/>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";
import Logo from "@/components/svg/Logo.vue";
import NavLang from "./NavLang.vue";
import NavSearch from "./NavSearch.vue";

export default {
  components: {
    logo: Logo,
    lang: NavLang,
    search: NavSearch
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
  /* box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1); */
}
/*
.navbar-burger {
  align-items: center;
  display: flex;
  top: -7.5px;
}
@media screen and (min-width: 1024px) {
  .navbar-burger {
    display: none;
  }
} */
.bsearch {
  background-color: transparent;
}
</style>
