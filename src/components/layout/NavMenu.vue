<template>
  <aside class="menu sidebar column is-narrow is-hidden-mobile">
    <div class="menu-inner">
      <p class="menu-label">
        {{ nav.name }}
      </p>
      <ul v-if="nav.type === 'hero'" class="menu-list">
        <options :size="'is-small'" rounded/>
        <br>
        <li v-for="i in nav.items" :key="i.id" class="nav-item">
          <a :href="'#' + i.id">{{ i.name }}</a>
          <ul v-if="'items' in i">
            <li v-for="j in i.items" :key="j.id" class="nav-item">
              <a :href="'#' + j.id">{{ j.name }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";
import Options from "@/components/hero/Options.vue";

export default {
  name: "NavMenu",
  components: {
    options: Options
  },
  computed: {
    ...mapGetters({
      nav: "getNav"
    })
  }
};
</script>

<style>
.menu {
  top: 52px;
  position: sticky;
  overflow: auto;
  max-height: calc(100vh - 2rem);
  width: 200px;
  z-index: 1;
}
.menu-inner {
  padding: 1rem;
}
.nav-item {
  line-height: 1;
  font-size: 0.75rem;
}
</style>
