<template>
  <b-autocomplete
    v-model="name"
    :data="filteredDataArray"
    :open-on-focus="true"
    :placeholder="getPlaceholder"
    pack="fas"
    icon="searchicon"
    @select="option => itemID = option">
    <template slot="empty">-</template>
  </b-autocomplete>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import Search from "../svg/Search.vue";

export default {
  name: "NavSearch",
  data() {
    return {
      name: ""
    };
  },
  computed: {
    ...mapGetters(["getArtifactList", "getHeroList"]),
    itemID: {
      get() {
        switch (this.$route.name) {
          case "":
          case "hero":
            return this.$store.state.heroID;
          case "artifact":
            return this.$store.state.artifactID;
        }
      },
      set(newID) {
        if (newID !== null) {
          switch (this.$route.name) {
            case "hero":
              this.$router.push({
                name: "hero",
                params: { id: this.getHeroList[newID] }
              });
              this.$store.commit("setHeroID", this.getHeroList[newID]);
              break;
            case "artifact":
              this.$router.push({
                name: "artifact",
                params: { id: this.getArtifactList[newID] }
              });
              this.$store.commit("setArtifactID", this.getArtifactList[newID]);
              break;
          }
        }
      }
    },
    itemList: function() {
      switch (this.$route.name) {
        case "hero":
          return Object.keys(this.getHeroList).sort();
        case "artifact":
          return Object.keys(this.getArtifactList).sort();
      }
    },
    getPlaceholder: function() {
      return this.itemList[0];
    },
    filteredDataArray: function() {
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
        if (newList_.length == 0) {
          return this.itemList;
        } else {
          return newList_;
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      new Vue(Search).$mount(".fa-searchicon");
    });
  }
};
</script>
