<template>
  <div id="star-selector" class="field has-addons">
    <div class="control">
      <p class="button is-static">★</p>
    </div>
    <div class="control is-expanded">
      <div class="select is-fullwidth">
        <select v-model="star">
          <option v-for="awakening in starLevel" :key="awakening.value" :value="awakening.value">{{ awakening.text }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StarSelector",
  data: function() {
    return {
      starLevel: [
        { text: "0", value: 0 },
        { text: "\u2605", value: 1 },
        { text: "\u2605\u2605", value: 2 },
        { text: "\u2605\u2605\u2605", value: 3 },
        { text: "\u2605\u2605\u2605\u2605", value: 4 },
        { text: "\u2605\u2605\u2605\u2605\u2605", value: 5 }
      ]
    };
  },
  computed: {
    star: {
      get() {
        return this.$store.state.star;
      },
      set(newStar) {
        this.$store.commit("starChange", newStar);
      }
    }
  }
};
</script>
