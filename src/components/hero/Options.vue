<template>
  <div id="hero-options">
    <star-selector 
      :size="size" 
      v-bind="$attrs" />
    <b-field :custom-class="size">
      <p class="control">
        <button 
          :class="iconClass" 
          class="button is-static">{{ $t("ui.level") }}</button>
      </p>
      <b-input 
        v-model="level" 
        :size="size" 
        v-bind="$attrs" 
        type="number" 
        expanded />
    </b-field>
  </div>
</template>

<script>
import StarSelector from "@/components/StarSelector.vue";

export default {
  name: "HeroOptions",
  components: {
    "star-selector": StarSelector
  },
  props: {
    size: {
      type: String,
      required: false,
      default: ""
    }
  },
  data: function() {
    return {
      starselected: false
    };
  },
  computed: {
    iconClass: function() {
      return this.size + " is-" + Object.keys(this.$attrs).join(" is-");
    },
    level: {
      get() {
        return this.$store.state.level;
      },
      set(newlevel) {
        this.$store.commit("levelChange", newlevel);
      }
    }
  }
};
</script>

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
