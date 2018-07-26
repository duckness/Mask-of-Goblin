import Vue from "vue";
import Vuex from "vuex";
import vuexI18n from "vuex-i18n";
import axios from "axios";
// eslint-disable-next-line
// import router from '@/router'

Vue.use(Vuex);

const lang = {
  en: {
    location: "./i18n/English.json",
    strings: require("./i18n/English.json"),
    loaded: true
  },
  "zh-Hans": {
    location: "/i18n/ChineseSimplified.json",
    strings: null,
    loaded: false
  },
  "zh-Hant": {
    location: "/i18n/ChineseTraditional.json",
    strings: null,
    loaded: false
  },
  fr: {
    location: "/i18n/French.json",
    strings: null,
    loaded: false
  },
  de: {
    location: "/i18n/German.json",
    strings: null,
    loaded: false
  },
  ja: {
    location: "/i18n/Japanese.json",
    strings: null,
    loaded: false
  },
  ko: {
    location: "/i18n/Korean.json",
    strings: null,
    loaded: false
  },
  pt: {
    location: "/i18n/Portuguese.json",
    strings: null,
    loaded: false
  },
  ru: {
    location: "/i18n/Russian.json",
    strings: null,
    loaded: false
  },
  es: {
    location: "/i18n/Spanish.json",
    strings: null,
    loaded: false
  },
  th: {
    location: "/i18n/Thai.json",
    strings: null,
    loaded: false
  },
  vi: {
    location: "/i18n/Vietnamese.json",
    strings: null,
    loaded: false
  }
};

const state = {
  locale: "en",
  artifactID: "1",
  heroID: "1",
  data: require("@/data.json"),
  star: 0,
  level: 0
};

const getters = {
  getArtifactList: function() {
    var artifacts = {};
    for (var artifact in lang[state.locale].strings["artifact"]) {
      artifacts[
        lang[state.locale].strings["artifact"][artifact]["name"]
      ] = artifact;
    }
    return artifacts;
  },
  getHeroList: function() {
    var heroes = {};
    for (var hero in lang[state.locale].strings["hero"]) {
      if (lang[state.locale].strings["hero"][hero]["name"] !== "") {
        heroes[lang[state.locale].strings["hero"][hero]["name"]] = hero;
      }
    }
    return heroes;
  },
  getArtifact: function() {
    return {
      image: require("@/components/artifact/images/" +
        state.artifactID +
        ".png"),
      name: Vue.i18n.translate("artifact." + state.artifactID + ".name"),
      description: Vue.i18n.translate(
        "artifact." + state.artifactID + ".description"
      )
    };
  },
  getHero: function() {
    var prefix = "hero." + state.heroID;
    return {
      image: require("@/components/hero/images/" + state.heroID + "/hero.png"),
      name: Vue.i18n.translate(prefix + ".name"),
      nameEN: lang.en.strings["hero"][state.heroID]["name"],
      subtitle: Vue.i18n.translate(prefix + ".subtitle"),
      class: Vue.i18n.translate("ui." + h.getClass()),
      description: Vue.i18n.translate(prefix + ".description"),
      t5: {
        light: Vue.i18n.translate(prefix + ".t5.light"),
        dark: Vue.i18n.translate(prefix + ".t5.dark")
      },
      attributes: {
        image: require("@/components/hero/images/classes/" +
          h.getClass() +
          ".png"),
        stats: h.getAttributes()
      },
      weapon: {
        image: require("@/components/hero/images/" + state.heroID + "/UW.png"),
        name: Vue.i18n.translate(prefix + ".uw.name"),
        description: Vue.i18n.translate(prefix + ".uw.description")
      },
      s1: h.getSkill(prefix + ".s1", "s1"),
      s2: h.getSkill(prefix + ".s2", "s2"),
      s3: h.getSkill(prefix + ".s3", "s3"),
      s4: h.getSkill(prefix + ".s4", "s4")
    };
  },
  getUAtk: function() {
    return h.getUnique(h.getClassStats().uatk);
  },
  getUHP: function() {
    return h.getUnique(11500);
  }
};

const actions = {};

const mutations = {
  setArtifactID: function(state, newID) {
    state.artifactID = newID;
  },
  setHeroID: function(state, newID) {
    state.heroID = newID;
  },
  setLocale: async function(state, locale) {
    locale = h.parseLocale(locale);
    await h.changeLocale(locale);
    Vue.i18n.set(locale);
    state.locale = locale;
  },
  starChange: function(state, newStar) {
    state.star = Number(newStar);
  },
  levelChange: function(state, newlevel) {
    // need to set the value twice to ensure the input value is refreshed
    state.level = Number(newlevel);
    state.level = h.levelValidation(newlevel);
  }
};

const h = {
  getClass: function() {
    return state.data.hero[state.heroID].class;
  },
  getAttributes: function() {
    var suffix = state.data.hero[state.heroID];
    var attrs = {
      dmgtype: Vue.i18n.translate("ui." + suffix["type"]),
      position:
        Vue.i18n.translate("ui." + suffix.position["type"]) +
        "/" +
        String(suffix.position.weight),
      mpatk: suffix.mpatk,
      mpsec: suffix.mpsec
    };
    return { ...attrs, ...h.getClassStats().attributes };
  },
  getClassStats: function() {
    return state.data.class[h.getClass()];
  },
  getSkill: function(prefix, skillNum) {
    var s = state.data.hero[state.heroID][skillNum];
    var d = {
      image: require("@/components/hero/images/" +
        state.heroID +
        "/" +
        skillNum +
        ".png"),
      name: Vue.i18n.translate(prefix + ".name"),
      description: Vue.i18n.translate(prefix + ".description", s.description),
      transcendence: {
        light: Vue.i18n.translate(prefix + ".light"),
        dark: Vue.i18n.translate(prefix + ".dark")
      },
      books: [
        Vue.i18n.translate(prefix + ".books.0", s.books[0]),
        Vue.i18n.translate(prefix + ".books.1", s.books[1]),
        Vue.i18n.translate(prefix + ".books.2", s.books[2])
      ]
    };
    // only s2 and s3 have treasures for now
    if (skillNum === "s2" || skillNum === "s3") {
      d.treasure = {
        image: require("@/components/hero/images/" +
          state.heroID +
          "/" +
          skillNum +
          "UT.png"),
        name: Vue.i18n.translate(prefix + ".ut.name"),
        description: Vue.i18n.translate(prefix + ".ut.description")
      };
    }
    // additional stats that may or may not be in data.json
    h.addIfExists(d, s, "mana");
    h.addIfExists(d, s, "cooldown");
    return d;
  },
  addIfExists: function(d, skill, attr) {
    if (attr in skill) {
      d[attr] = skill[attr];
    }
  },
  getUnique: function(baseVal) {
    return Math.floor(
      (Math.floor(
        (state.data.scaling.star[state.star] *
          state.data.scaling.level[state.level]) /
          1000
      ) *
        baseVal) /
        1000
    );
  },
  levelValidation: function(level) {
    level = Number(level);
    var minLevel = 0;
    var maxLevel = 90;
    var newLevel = h.numberWithinBounds(minLevel, maxLevel, level);
    return newLevel;
  },
  numberWithinBounds: function(min, max, number) {
    return number < min ? min : number > max ? max : number;
  },
  changeLocale: async function(locale) {
    if (!lang[locale].loaded) {
      lang[locale].loaded = true;
      var result = await axios(lang[locale].location);
      lang[locale].strings = result.data;
      Vue.i18n.add(locale, result.data);
    }
  },
  parseLocale: function(locale) {
    var l = locale.split("-");
    if (l[0].toLowerCase() === "zh") {
      var tradtional = ["TW", "HK", "HANT"];
      if (l.length > 1 && tradtional.indexOf(l[1].toUpperCase()) > 1) {
        return "zh-Hant";
      } else {
        return "zh-Hans";
      }
    } else if (l[0].toLowerCase() in lang) {
      return l[0].toLowerCase();
    } else {
      return "en";
    }
  }
};

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});

// Vue.use(vuexI18n.plugin, store)

// only ask for translation ONCE from the server as all the strings are in a single JSON
// would otherwise FLOOD the server with requests for the JSON

Vue.use(vuexI18n.plugin, store, {
  moduleName: "i18n",
  onTranslationNotFound(locale) {
    return h.changeLocale(locale);
  }
});

Vue.i18n.add("en", lang.en.strings);
Vue.i18n.set("en");
store.commit("setLocale", navigator.language);
Vue.i18n.fallback("en");

export default store;
