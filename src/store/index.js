import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import axios from 'axios'
// eslint-disable-next-line
// import router from '@/router'

Vue.use(Vuex)

const lang = {
  'en': {
    'location': './i18n/English.json',
    'strings': require('./i18n/English.json'),
    'loaded': true
  },
  'fr': {
    'location': '/static/i18n/French.json',
    'strings': null,
    'loaded': false
  },
  'de': {
    'location': '/static/i18n/German.json',
    'strings': null,
    'loaded': false
  },
  'ja': {
    'location': '/static/i18n/Japanese.json',
    'strings': null,
    'loaded': false
  },
  'ko': {
    'location': '/static/i18n/Korean.json',
    'strings': null,
    'loaded': false
  },
  'pt': {
    'location': '/static/i18n/Portuguese.json',
    'strings': null,
    'loaded': false
  },
  'ru': {
    'location': '/static/i18n/Russian.json',
    'strings': null,
    'loaded': false
  },
  'es': {
    'location': '/static/i18n/Spanish.json',
    'strings': null,
    'loaded': false
  },
  'th': {
    'location': '/static/i18n/Thai.json',
    'strings': null,
    'loaded': false
  },
  'vi': {
    'location': '/static/i18n/Vietnamese.json',
    'strings': null,
    'loaded': false
  }
}

const state = {
  locale: 'en',
  artifactID: '1',
  heroID: '1',
  data: require('@/data.json'),
  star: 0,
  level: 0
}

const getters = {
  getArtifactList: function () {
    var artifacts = {}
    for (var artifact in lang[state.locale].strings['artifact']) {
      artifacts[lang[state.locale].strings['artifact'][artifact]['name']] = artifact
    }
    return artifacts
  },
  getHeroList: function () {
    var heroes = {}
    for (var hero in lang[state.locale].strings['hero']) {
      heroes[lang[state.locale].strings['hero'][hero]['name']] = hero
    }
    return heroes
  },
  getArtifact: function () {
    return {
      'image': require('@/components/artifact/images/' + state.artifactID + '.png'),
      'name': Vue.i18n.translate('artifact.' + state.artifactID + '.name'),
      'description': Vue.i18n.translate('artifact.' + state.artifactID + '.description')
    }
  },
  getHero: function () {
    var prefix = 'hero.' + state.heroID
    return {
      'image': require('@/components/hero/images/' + state.heroID + '/hero.png'),
      'name': Vue.i18n.translate(prefix + '.name'),
      'subtitle': Vue.i18n.translate(prefix + '.subtitle'),
      'class': Vue.i18n.translate('ui.' + h.getClass()),
      'description': Vue.i18n.translate(prefix + '.description'),
      't5': {
        'light': Vue.i18n.translate(prefix + '.t5.light'),
        'dark': Vue.i18n.translate(prefix + '.t5.dark')
      },
      'attributes': {
        'image': require('@/components/hero/images/classes/' + h.getClass() + '.png'),
        'stats': h.getClassStats().attributes
      },
      'treasure': {
        'image': require('@/components/hero/images/' + state.heroID + '/UT.png'),
        'name': Vue.i18n.translate(prefix + '.treasure.name'),
        'description': Vue.i18n.translate(prefix + '.treasure.description')
      },
      'weapon': {
        'image': require('@/components/hero/images/' + state.heroID + '/UW.png'),
        'name': Vue.i18n.translate(prefix + '.weapon.name'),
        'description': Vue.i18n.translate(prefix + '.weapon.description')
      },
      's1': h.getSkill(prefix + '.s1', 's1'),
      's2': h.getSkill(prefix + '.s2', 's2'),
      's3': h.getSkill(prefix + '.s3', 's3'),
      's4': h.getSkill(prefix + '.s4', 's4')
    }
  },
  getUAtk: function () {
    return h.getUnique(h.getClassStats().uatk)
  },
  getUHP: function () {
    return h.getUnique(11500)
  }
}

const actions = {

}

const mutations = {
  setArtifactID: function (state, newID) {
    state.artifactID = newID
  },
  setHeroID: function (state, newID) {
    state.heroID = newID
  },
  setLocale: function (state, locale) {
    h.changeLocale(locale)
    Vue.i18n.set(locale)
    state.locale = locale
  },
  starChange: function (state, newStar) {
    state.star = Number(newStar)
  },
  levelChange: function (state, newlevel) {
    // need to set the value twice to ensure the input value is refreshed
    state.level = Number(newlevel)
    state.level = h.levelValidation(newlevel)
  }
}

const h = {
  getClass: function () {
    return state.data.hero[state.heroID].class
  },
  getClassStats: function () {
    return state.data.class[h.getClass()]
  },
  getSkill: function (prefix, skillNum) {
    return {
      'image': require('@/components/hero/images/' + state.heroID + '/' + skillNum + '.png'),
      'name': Vue.i18n.translate(prefix + '.name'),
      // 'description': Vue.i18n.translate(prefix + '.description'),
      'description': "Vue.i18n.translate(prefix + '.description')",
      'transcendence': {
        'light': Vue.i18n.translate(prefix + '.transcendence.light'),
        'dark': Vue.i18n.translate(prefix + '.transcendence.dark')
      },
      'books': [
        Vue.i18n.translate(prefix + '.books.1', [0, 10]),
        Vue.i18n.translate(prefix + '.books.2', [0, 15]),
        Vue.i18n.translate(prefix + '.books.3', [0, 25])
      ]
    }
  },
  getUnique: function (baseVal) {
    return Math.floor(Math.floor(state.data.scaling.star[state.star] * state.data.scaling.level[state.level] / 1000) * baseVal / 1000)
  },
  levelValidation: function (level) {
    level = Number(level)
    var minLevel = 0
    var maxLevel = 80
    var newLevel = h.numberWithinBounds(minLevel, maxLevel, level)
    return newLevel
  },
  numberWithinBounds: function (min, max, number) {
    return number < min ? min : (number > max ? max : number)
  },
  changeLocale: function (locale) {
    if (!lang[locale].loaded) {
      lang[locale].loaded = true
      return new Promise((resolve, reject) => {
        axios.get(lang[locale].location)
          .then((result) => {
            resolve(
              lang[locale].strings = result.data,
              Vue.i18n.add(locale, result.data),
              state.locale = locale
            )
          })
      })
    }
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

// Vue.use(vuexI18n.plugin, store)

// only ask for translation ONCE from the server as all the strings are in a single JSON
// would otherwise FLOOD the server with requests for the JSON

Vue.use(vuexI18n.plugin, store, {
  moduleName: 'i18n',
  onTranslationNotFound (locale, key) {
    return h.changeLocale(locale)
  }
})

Vue.i18n.add('en', lang.en.strings)

Vue.i18n.set(navigator.language.split('-')[0])
Vue.i18n.fallback('en')

export default store
