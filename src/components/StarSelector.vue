<template>
  <b-field
    id="star-selector-field"
    :custom-class="size">
    <p class="control">
      <button
        :class="iconClass"
        class="button is-static">★</button>
    </p>
    <b-select
      id="star-selector-input"
      v-model="star"
      :size="size"
      v-bind="$attrs"
      expanded
      @focus="scrollHandler()">
      <option
        v-for="awakening in starLevel"
        :key="awakening.value"
        :value="awakening.value"
        class="has-text-grey">{{ awakening.text }}</option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  name: "StarSelector",
  props: {
    size: {
      type: String,
      required: false,
      default: ""
    }
  },
  data: function() {
    return {
      starLevel: [
        { text: "0", value: 0 },
        { text: "\u2605", value: 1 },
        { text: "\u2605\u2605", value: 2 },
        { text: "\u2605\u2605\u2605", value: 3 },
        { text: "\u2605\u2605\u2605\u2605", value: 4 },
        { text: "\u2605\u2605\u2605\u2605\u2605", value: 5 }
      ],
      yLast: 0,
      yCurrent: 0
    };
  },
  computed: {
    iconClass: function() {
      return this.size + " is-" + Object.keys(this.$attrs).join(" is-");
    },
    star: {
      get() {
        return this.$store.state.star;
      },
      set(newStar) {
        this.$store.commit("starChange", newStar);
      }
    }
  },
  // this and below functions are a hack to ensure it doesn't scroll to top on focus
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
    this.yCurrent = window.scrollY;
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  },
  methods: {
    scrollListener: function() {
      this.yCurrent = window.scrollY;
    },
    scrollHandler: function() {
      window.scrollTo(0, this.yCurrent);
      // scroll event unfocuses the select box, we just focus it again
      document.getElementById("star-selector-input").click();
    }
  }
};
</script>
