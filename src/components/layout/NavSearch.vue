<template>
  <b-autocomplete
    v-model="name"
    :data="filteredDataArray"
    :open-on-focus="true"
    :placeholder="getPlaceholder"
    icon="searchicon"
    @select="option => itemID = option"
  >
    <template slot="empty">
      -
    </template>
  </b-autocomplete>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import Search from "../svg/Search.vue";

export default {
  name: "NavSearch",
  data () {
    return {
      name: ""
    };
  },
  computed: {
    ...mapGetters(["getArtifactList", "getHeroList"]),
    itemID: {
      get () {
        var r = this.$store.state.heroID;
        if (this.$route.name === "artifact") {
          r = this.$store.state.artifactID;
        }
        return r;
      },
      async set (newID) {
        if (newID !== null) {
          switch (this.$route.name) {
            case "hero":
              this.$router.push({
                name: "hero",
                params: { id: this.getHeroList[newID] }
              });
              // this.$store.commit("setHeroID", this.getHeroList[newID]);
              await this.$store.dispatch("changeItem", {
                mutation: "setHeroID",
                kind: "hero",
                num: this.getHeroList[newID]
              });
              break;
            case "artifact":
              this.$router.push({
                name: "artifact",
                params: { id: this.getArtifactList[newID] }
              });
              // this.$store.commit("setArtifactID", this.getArtifactList[newID]);
              await this.$store.dispatch("changeItem", {
                mutation: "setArtifactID",
                kind: "artifact",
                num: this.getArtifactList[newID]
              });
              break;
          }
        }
      }
    },
    itemList: function () {
      var i = Object.keys(this.getHeroList).sort();
      if (this.$route.name === "artifact") {
        i = Object.keys(this.getArtifactList).sort();
      }
      return i;
    },
    getPlaceholder: function () {
      return this.itemList[0];
    },
    filteredDataArray: function () {
      var index = this.itemList.indexOf(this.name);
      if (index > -1) {
        var newList = this.itemList.slice();
        newList.splice(index, 1);
        newList.unshift(this.name);
        return newList;
      } else {
        var newList_ = this.itemList.filter(option => {
          return (
            option
              .toString()
              .toLowerCase()
              .indexOf(this.name.toLowerCase()) >= 0
          );
        });
        if (newList_.length === 0) {
          return this.itemList;
        } else {
          return newList_;
        }
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      new Vue(Search).$mount(".mdi-searchicon");
    });
  }
};
</script>
