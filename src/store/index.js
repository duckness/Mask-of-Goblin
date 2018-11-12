import Vue from "vue";
import Vuex from "vuex";
import vuexI18n from "vuex-i18n";
import axios from "axios";

Vue.use(Vuex);

const lang = {
  en: {
    location: "/i18n/English/",
    loaded: false
  },
  "zh-Hans": {
    location: "/i18n/ChineseSimplified/",
    loaded: false
  },
  "zh-Hant": {
    location: "/i18n/ChineseTraditional/",
    loaded: false
  },
  fr: {
    location: "/i18n/French/",
    loaded: false
  },
  de: {
    location: "/i18n/German/",
    loaded: false
  },
  ja: {
    location: "/i18n/Japanese/",
    loaded: false
  },
  ko: {
    location: "/i18n/Korean/",
    loaded: false
  },
  pt: {
    location: "/i18n/Portuguese/",
    loaded: false
  },
  ru: {
    location: "/i18n/Russian/",
    loaded: false
  },
  es: {
    location: "/i18n/Spanish/",
    loaded: false
  },
  th: {
    location: "/i18n/Thai/",
    loaded: false
  },
  vi: {
    location: "/i18n/Vietnamese/",
    loaded: false
  }
};

const state = {
  locale: "en",
  artifactID: "1",
  heroID: "1",
  data: require("@/data.json"),
  star: 0,
  level: 0,
  lang: lang,
  heroList: {},
  artifactList: {}
};

const getters = {
  // sidebar navigation
  getNav: function () {
    if (state.route.name === "hero") {
      const hero = getters.getHero();
      if (!hero) {
        return null;
      }
      var d = {
        type: "hero",
        name: hero.name,
        items: [{ name: "Attributes", id: "attrs" }]
      };
      for (var i = 1; i < 5; i++) {
        var s = "s" + i;
        d.items.push({
          name: "Skill " + i,
          id: s,
          items: [
            { name: "Transcendence", id: s + "t3" },
            { name: "Books", id: s + "books" }
          ]
        });
        if ("linked" in hero[s]) {
          d.items[i].items.unshift({ name: "Linked", id: s + "linked" });
        }
        if ("treasure" in hero[s]) {
          d.items[i].items.push({
            name: Vue.i18n.translate("ui.treasure"),
            id: s + "ut"
          });
        }
      }
      d.items.push({ name: Vue.i18n.translate("ui.weapon"), id: "uw" });
      return d;
    } else {
      return null;
    }
  },
  getArtifactList: function () {
    return state.artifactList;
  },
  getHeroList: function () {
    return state.heroList;
  },
  getArtifact: function () {
    if (
      !Vue.i18n.keyExists("artifact." + state.artifactID + ".name", "strict")
    ) {
      return null;
    }
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
  getHero: function () {
    var prefix = "hero." + state.heroID;
    if (!Vue.i18n.keyExists(prefix + ".name", "strict")) {
      return null;
    }
    return {
      image: require("@/components/hero/images/" + state.heroID + "/hero.png"),
      name: Vue.i18n.translate(prefix + ".name"),
      // nameEN: lang.en.strings["hero"][state.heroID]["name"],
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
      auto: h.getAuto(),
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
  getUAtk: function () {
    return h.getUnique(h.getClassStats().uatk);
  },
  getUHP: function () {
    return h.getUnique(11500);
  }
};

const actions = {
  async setLocale ({ commit }, locale) {
    locale = h.parseLocale(locale);
    await h.changeLocale(locale);
    commit("setArtifactList", lang[locale].artifact.names);
    commit("setHeroList", lang[locale].hero.names);
    commit("setLocale", locale);
  },
  async changeItem ({ commit }, params) {
    h.createIfNotExist(lang, state.locale, params.kind, params.num);
    await h.getLocaleText(state.locale, params.kind, params.num);
    commit(params.mutation, params.num);
  },
  async initialLoad ({ commit }, params) {
    var locale = h.parseLocale(navigator.language);
    h.createIfNotExist(lang, locale, params.kind, params.num);
    h.createIfNotExist(lang, locale, "hero", "1");
    h.createIfNotExist(lang, locale, "artifact", "1");
    h.createIfNotExist(lang, locale, "hero");
    h.createIfNotExist(lang, locale, "artifact");
    await store.dispatch("setLocale", locale);
    await h.getLocaleText(locale, params.kind, params.num);
    await h.getLocaleText(locale, "hero", "1");
    await h.getLocaleText(locale, "artifact", "1");
    commit("setHeroList", state.lang[state.locale].hero.names);
    commit("setArtifactList", state.lang[state.locale].artifact.names);
  }
};

const mutations = {
  setArtifactID: function (state, newID) {
    state.artifactID = newID;
  },
  setHeroID: function (state, newID) {
    state.heroID = newID;
  },
  setHeroList: function (state, list) {
    state.heroList = list;
  },
  setArtifactList: function (state, list) {
    state.artifactList = list;
  },
  setLocale: function (state, locale) {
    Vue.i18n.set(locale);
    state.locale = locale;
  },
  starChange: function (state, newStar) {
    state.star = Number(newStar);
  },
  levelChange: function (state, newlevel) {
    // need to set the value twice to ensure the input value is refreshed
    state.level = Number(newlevel);
    state.level = h.levelValidation(newlevel);
  }
};

const h = {
  getClass: function () {
    return state.data.hero[state.heroID].class;
  },
  getAuto: function () {
    var suffix = state.data.hero[state.heroID];
    return {
      hits: suffix.auto.time,
      duration: suffix.auto.duration
    };
  },
  getAttributes: function () {
    var suffix = state.data.hero[state.heroID];
    var attrs = {
      dmgtype:
        Vue.i18n.translate("ui." + suffix["type"]) +
        "/" +
        suffix.auto.rangeType,
      range: suffix.auto.range,
      position:
        Vue.i18n.translate("ui." + suffix.position["type"]) +
        "/" +
        String(suffix.position.weight),
      mpatk: suffix.mpatk,
      mpsec: suffix.mpsec
    };
    return { ...attrs, ...h.getClassStats().attributes };
  },
  getClassStats: function () {
    return state.data.class[h.getClass()];
  },
  getSkill: function (prefix, skillNum) {
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
    // only s1, s2 and s3 have treasures for now
    if (skillNum === "s1" || skillNum === "s2" || skillNum === "s3") {
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
    // Linked skills if exists (Kara)
    if ("linked" in s) {
      d["linked"] = {
        image: require("@/components/hero/images/" +
          state.heroID +
          "/" +
          skillNum +
          "l.png"),
        name: Vue.i18n.translate(prefix + ".linked.name"),
        description: Vue.i18n.translate(
          prefix + ".linked.description",
          s.linked
        )
      };
    }
    return d;
  },
  addIfExists: function (d, skill, attr) {
    if (attr in skill) {
      d[attr] = skill[attr];
    }
  },
  getUnique: function (baseVal) {
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
  levelValidation: function (level) {
    level = Number(level);
    var minLevel = 0;
    var maxLevel = 90;
    var newLevel = h.numberWithinBounds(minLevel, maxLevel, level);
    return newLevel;
  },
  numberWithinBounds: function (min, max, number) {
    return number < min ? min : number > max ? max : number;
  },
  createIfNotExist: function (dict, ...args) {
    let d = dict;
    for (let i = 0; i < args.length; i++) {
      if (!d[args[i]]) {
        d[args[i]] = {};
      }
      d = d[args[i]];
    }
  },
  getLocaleText: async function (locale, kind, num) {
    if (!lang[locale][kind][num].loaded) {
      lang[locale][kind][num].loaded = true;
      var result = await axios(
        lang[locale].location + kind + "/" + num + ".json"
      );
      Vue.i18n.add(locale, { [kind]: { [num]: result.data } });
    }
  },
  changeLocale: async function (locale) {
    if (!lang[locale].loaded) {
      lang[locale].loaded = true;
      var hero = await axios(lang[locale].location + "hero/names.json");
      var artifact = await axios(lang[locale].location + "artifact/names.json");
      var ui = await axios(lang[locale].location + "ui.json");
      h.createIfNotExist(lang, locale, "artifact", state.artifactID);
      h.createIfNotExist(lang, locale, "hero", state.heroID);
      await h.getLocaleText(locale, "artifact", state.artifactID);
      await h.getLocaleText(locale, "hero", state.heroID);
      h.createIfNotExist(lang, locale, "hero");
      h.createIfNotExist(lang, locale, "artifact");
      lang[locale].hero.names = hero.data;
      lang[locale].artifact.names = artifact.data;
      Vue.i18n.add(locale, { ui: ui.data });
    } else {
      h.createIfNotExist(lang, locale, "artifact", state.artifactID);
      h.createIfNotExist(lang, locale, "hero", state.heroID);
      await h.getLocaleText(locale, "artifact", state.artifactID);
      await h.getLocaleText(locale, "hero", state.heroID);
    }
  },
  parseLocale: function (locale) {
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

Vue.use(vuexI18n.plugin, store, {
  moduleName: "i18n",
  // eslint-disable-next-line
  async onTranslationNotFound(locale) {
    // return await h.changeLocale(locale);
  }
});

export default store;
