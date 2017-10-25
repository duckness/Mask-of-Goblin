import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

const sortKeys = require('sort-keys')

Vue.use(Vuex)

const state = {
  page: 'uw',
  items: sortKeys(require('@/assets/items.json'), { deep: true }),
  item: 'Kasel',
  oldItem: 'Mask of Goblin',
  enableLevel: true,
  star: 0,
  enhance: 0
}

const getters = {
  itemImage: function () {
    return require('@/assets/' + state.page + '/' + state.item + '.png')
  },
  equips: function () {
    let equips = ''
    switch (state.page) {
      case 'uw':
        equips = Object.keys(state.items.uw.weapon)
        break
      case 'artifact':
        equips = Object.keys(state.items.artifact)
        break
    }
    return equips
  },
  itemName: function () {
    let name = ''
    switch (state.page) {
      case 'uw':
        name = state.items.uw.weapon[state.item].name
        break
      case 'artifact':
        name = state.item
        break
    }
    return name
  },
  attack: function () {
    let atk = ''
    switch (state.page) {
      case 'uw':
        atk = '(' + Math.floor(Math.floor(state.items.uw.starScale[state.star] * state.items.uw.levelScale[state.enhance] / 1000) * state.items.uw.weapon[state.item].baseAtk / 1000) + ' atk)'
        break
      case 'artifact':
        atk = ''
        break
    }
    return atk
  },
  description: function () {
    let itemText = ''
    switch (state.page) {
      case 'uw':
        itemText = state.items.uw.weapon[state.item].description[state.star]
        break
      case 'artifact':
        itemText = state.items.artifact[state.item].description[state.star]
        break
    }
    return itemText
  },
  additionalInfo: function () {
    let additionalInfo = ''
    function pickInfo (info, star) {
      if (Array.isArray(info)) {
        return info[star]
      } else {
        return info
      }
    }
    switch (state.page) {
      case 'uw':
        additionalInfo = pickInfo(state.items.uw.weapon[state.item].info, state.star)
        break
      case 'artifact':
        additionalInfo = pickInfo(state.items.artifact[state.item].info, state.star)
        break
    }
    return additionalInfo
  }
}

const actions = {

}

const mutations = {
  setItems: function (state, items) {
    state.items = items
  },
  pageChange: function (state, newPage) {
    state.page = newPage
    var tempItem = state.item
    state.item = state.oldItem
    state.oldItem = tempItem
    switch (state.page) {
      case 'uw':
        state.enableLevel = true
        break
      case 'artifact':
        state.enableLevel = false
        break
    }
  },
  itemChange: function (state, newItem) {
    state.item = newItem
  },
  starChange: function (state, newStar) {
    state.star = Number(newStar)
  },
  enhanceChange: function (state, newEnhance) {
    // need to set the value twice to ensure the input value is refreshed
    state.enhance = Number(newEnhance)
    state.enhance = helpers.enhanceValidation(newEnhance)
  }
}

const routing = store => {
  // called when the store is initialized
  // can't use this to init app as route is not in store yet
  var start = true
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    // we map route to state on load once, since vuex-route-sync will mutate state
    // afterwards, we only modify routing from new state
    switch (mutation.type) {
      case 'route/ROUTE_CHANGED':
        // only want to set application state at the start
        if (start) {
          helpers.routeInit(state.route.query)
          start = false
        }
        break
      case 'pageChange':
      case 'itemChange':
      case 'starChange':
      case 'enhanceChange':
        helpers.modifyRoute()
        break
      default:
        break
    }
  })
}

const helpers = {
  // Initialize the app with the route, we specifically do NOT want to call mutations
  // otherwise we will trigger the rerouting over and over while this is modifying initial state
  routeInit: function (query) {
    if ('item' in query) {
      if (query.item in state.items.artifact) {
        state.oldItem = 'Kasel'
        state.enableLevel = false
        state.page = 'artifact'
        state.item = query.item
      } else if (query.item in state.items.uw.weapon) {
        state.page = 'uw'
        state.item = query.item
      }
    }
    if ('star' in query) {
      if (!isNaN(Number(query.star))) {
        state.star = helpers.numberWithinBounds(0, 5, Number(query.star))
      }
    }
    if ('enhance' in query) {
      if (!isNaN(Number(query.enhance))) {
        state.enhance = helpers.enhanceValidation(query.enhance)
      }
    }
  },
  modifyRoute: function () {
    if (state.page === 'uw') {
      router.replace({ query: { item: state.item, star: state.star, enhance: state.enhance } })
    } else {
      router.replace({ query: { item: state.item, star: state.star } })
    }
  },
  enhanceValidation: function (level) {
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

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [routing]
})
