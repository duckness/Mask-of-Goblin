<template>
  <b-dropdown v-model="locale">
    <a slot="trigger" class="navbar-item">
      {{ locale }}
      <b-icon icon="angle-down"/>
    </a>
    <b-dropdown-item v-for="language in languages" :key="language.id" :value="language">
      {{ language }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
export default {
  data: function () {
    return {
      languages: {
        'en': 'English',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japan',
        'ko': 'Korean',
        'pt': 'Portugese',
        'ru': 'Russian',
        'es': 'Spanish',
        'th': 'Thai',
        'vi': 'Vietnamese'
      }
    }
  },
  computed: {
    locale: {
      get () {
        return this.languages[this.$store.state.locale]
      },
      set (newLocale) {
        this.$store.commit('setLocale', Object.keys(this.languages).find(key => this.languages[key] === newLocale))
      }
    }
  }
}
</script>

<style>

</style>
