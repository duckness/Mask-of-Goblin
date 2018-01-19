import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

const state = {
  page: 'hero',
  items: require('@/data.json'),
  heroItem: 'Kasel',
  artifactItem: 'Mask of Goblin',
  calcItem: 'softcap',
  enableLevel: true,
  star: 0,
  level: 0
}

const getters = {
  getHero: function () {
    return state.items.hero[state.heroItem]
  },
  itemImage: function () {
    switch (state.page) {
      case 'hero':
        // return the require like this as require is fussy
        return require('@/components/hero/images/uw/' + state.heroItem + '.png')
      case 'artifact':
        return require('@/components/artifact/images/' + state.artifactItem + '.png')
    }
  },
  equips: function () {
    let equips = []
    switch (state.page) {
      case 'hero':
      /*
        var temps = Object.keys(state.items.hero)
        for (var i = 0; i < temps.length; i += 1) {
          if ('description' in state.items.hero[temps[i]]) {
            equips.push(temps[i])
          }
        }
      */
        equips = Object.keys(state.items.hero)
        break
      case 'artifact':
        equips = Object.keys(state.items.artifact)
        break
      case 'calc':
        equips = state.items.calc
        break
    }
    return equips.sort()
  },
  itemName: function () {
    let name = ''
    switch (state.page) {
      case 'hero':
        name = state.items.hero[state.heroItem].weapon.name
        break
      case 'artifact':
        name = state.artifactItem
        break
    }
    return name
  },
  attack: function () {
    let atk = ''
    switch (state.page) {
      case 'hero':
        atk = '(' + Math.floor(Math.floor(state.items.uwScale.starScale[state.star] * state.items.uwScale.levelScale[state.level] / 1000) * state.items.hero[state.heroItem].weapon.baseAtk / 1000) + ' atk)'
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
      case 'hero':
        itemText = state.items.hero[state.heroItem].weapon.description[state.star]
        break
      case 'artifact':
        itemText = state.items.artifact[state.artifactItem].description[state.star]
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
      case 'hero':
        additionalInfo = pickInfo(state.items.hero[state.heroItem].weapon.info, state.star)
        break
      case 'artifact':
        additionalInfo = pickInfo(state.items.artifact[state.artifactItem].info, state.star)
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
    switch (state.page) {
      case 'hero':
        state.enableLevel = true
        break
      case 'artifact':
      case 'calc':
        state.enableLevel = false
        break
    }
  },
  itemChange: function (state, newItem) {
    switch (state.page) {
      case 'hero':
        state.heroItem = newItem
        break
      case 'artifact':
        state.artifactItem = newItem
        break
      case 'calc':
        state.calcItem = newItem
        break
    }
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
      case 'levelChange':
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
        state.enableLevel = false
        state.page = 'artifact'
        state.artifactItem = query.item
      } else if (query.item in state.items.hero) {
        state.page = 'hero'
        state.heroItem = query.item
      } else if (state.items.calc.includes(query.item)) {
        state.page = 'calc'
        state.calcItem = query.item
      }
    }
    if ('star' in query) {
      if (!isNaN(Number(query.star))) {
        state.star = helpers.numberWithinBounds(0, 5, Number(query.star))
      }
    }
    if ('level' in query) {
      if (!isNaN(Number(query.level))) {
        state.level = helpers.levelValidation(query.level)
      }
    }
  },
  modifyRoute: function () {
    if (state.page === 'hero') {
      router.replace({ query: { item: state.heroItem, star: state.star, level: state.level } })
    } else if (state.page === 'artifact') {
      router.replace({ query: { item: state.artifactItem, star: state.star } })
    } else {
      router.replace({ query: { item: state.calcItem } })
    }
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

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [routing]
})
