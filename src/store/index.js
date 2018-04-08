import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import axios from 'axios'
// eslint-disable-next-line
// import router from '@/router'

Vue.use(Vuex)

const lang = {
  'en': require('./i18n/English.json'),
  'fr': '/static/i18n/French.json',
  'de': '/static/i18n/German.json',
  'ja': '/static/i18n/Japanese.json',
  'ko': '/static/i18n/Korean.json',
  'pt': '/static/i18n/Portuguese.json',
  'ru': '/static/i18n/Russian.json',
  'es': '/static/i18n/Spanish.json',
  'th': '/static/i18n/Thai.json',
  'vi': '/static/i18n/Vietnamese.json'
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
    for (var artifact in lang[state.locale]['artifact']) {
      artifacts[lang[state.locale]['artifact'][artifact]['name']] = artifact
    }
    return artifacts
  },
  getHeroList: function () {
    var heroes = {}
    for (var hero in lang[state.locale]['hero']) {
      heroes[lang[state.locale]['hero'][hero]['name']] = hero
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
      'class': Vue.i18n.translate('ui.' + helpers.getClass()),
      'description': Vue.i18n.translate(prefix + '.description'),
      't5': {
        'light': Vue.i18n.translate(prefix + '.t5.light'),
        'dark': Vue.i18n.translate(prefix + '.t5.dark')
      },
      'attributes': {
        'image': require('@/components/hero/images/classes/' + helpers.getClass() + '.png'),
        'stats': helpers.getClassStats().attributes
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
      's1': helpers.getSkill(prefix + '.s1', 's1'),
      's2': helpers.getSkill(prefix + '.s2', 's2'),
      's3': helpers.getSkill(prefix + '.s3', 's3'),
      's4': helpers.getSkill(prefix + '.s4', 's4')
    }
  },
  getUAtk: function () {
    return helpers.getUnique(helpers.getClassStats().uatk)
  },
  getUHP: function () {
    return helpers.getUnique(11500)
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
  starChange: function (state, newStar) {
    state.star = Number(newStar)
  },
  levelChange: function (state, newlevel) {
    // need to set the value twice to ensure the input value is refreshed
    state.level = Number(newlevel)
    state.level = helpers.levelValidation(newlevel)
  }
}

const helpers = {
  getClass: function () {
    return state.data.hero[state.heroID].class
  },
  getClassStats: function () {
    return state.data.class[helpers.getClass()]
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
    var newLevel = helpers.numberWithinBounds(minLevel, maxLevel, level)
    return newLevel
  },
  numberWithinBounds: function (min, max, number) {
    return number < min ? min : (number > max ? max : number)
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
var isFetched = false

Vue.use(vuexI18n.plugin, store, {
  moduleName: 'i18n',
  onTranslationNotFound (locale, key) {
    if (!isFetched) {
      isFetched = true
      return new Promise((resolve, reject) => {
        axios.get(lang[locale])
          .then((result) => {
            resolve(
              lang[locale] = result.data,
              Vue.i18n.add(locale, result.data),
              state.locale = locale
            )
          })
      })
    }
  }
})

Vue.i18n.add('en', lang.en)

Vue.i18n.set(navigator.language.split('-')[0])
Vue.i18n.fallback('en')

export default store
