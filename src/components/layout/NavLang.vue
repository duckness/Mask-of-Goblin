<template>
  <b-dropdown v-model="locale">
    <a slot="trigger" class="navbar-item">
      {{ locale }}&nbsp;
      <icon name="angle-down"/>
    </a>
    <b-dropdown-item v-for="language in languages" :key="language.id" :value="language">
      {{ language }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import "vue-awesome/icons/angle-down";

export default {
  data: function() {
    return {
      languages: {
        en: "English",
        "zh-Hans": "Chinese (Simplified)",
        "zh-Hant": "Chinese (Traditional)",
        fr: "French",
        de: "German",
        ja: "Japan",
        ko: "Korean",
        pt: "Portugese",
        ru: "Russian",
        es: "Spanish",
        th: "Thai",
        vi: "Vietnamese"
      }
    };
  },
  computed: {
    locale: {
      get() {
        return this.languages[this.$store.state.locale];
      },
      async set(newLocale) {
        const langload = this.$loading.open({
          container: null
        });
        await this.$store.dispatch(
          "setLocale",
          Object.keys(this.languages).find(
            key => this.languages[key] === newLocale
          )
        );
        langload.close();
      }
    }
  }
};
</script>

<style>
</style>
