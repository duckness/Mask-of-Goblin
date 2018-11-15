<template>
  <b-dropdown>
    <a
      slot="trigger"
      class="navbar-item"
    >
      {{ $t("ui.hero") }}&nbsp;
      <icon name="angle-down" />
    </a>

    <b-dropdown-item custom>
      <div class="columns">
        <div
          v-for="heroClass in heroClasses"
          :key="heroClass"
          class="column"
        >
          <label class="label">{{ $t("ui." + heroClass) }}</label>
          <ul class="is-unstyled">
            <li
              v-for="hero in heroes[heroClass]"
              :key="hero"
            >
              <a :href="'/hero/' + getHeroList[hero]">{{ hero }}</a>
            </li>
          </ul>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["data"]),
    ...mapGetters(["getHeroList"]),
    heroClasses: function () {
      return Object.keys(this.data.class).sort();
    },
    heroes: function () {
      var l = {};
      for (var i = 0; i < this.heroClasses.length; i++) {
        l[this.heroClasses[i]] = [];
      }
      for (var h in this.data.hero) {
        var name = Object.keys(this.getHeroList).find(key => this.getHeroList[key] === h);
        l[this.data.hero[h].class].push(name);
      }
      for (var item in l) {
        l[item].sort();
      }
      return l;
    }
  }
};
</script>

<style lang="scss">
ul.is-unstyled {
  list-style-type: none;
  margin: 0;
  padding: 0;
  min-width: 80px;
  li {
    margin: 0 0 8px;
  }
  li:last-child {
    margin: 0;
  }
}
</style>
