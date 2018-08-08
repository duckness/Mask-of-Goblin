<template>
  <span class="container">
    <a :id="to" class="anchor"/>
    <ah :header="header" class="title header">
      <a :href="'#' + to" class="anchor-link">
        <icon class="anchor-icon is-hidden-mobile" name="link" />
        <slot />
      </a>
    </ah>
  </span>
</template>

<script>
import "vue-awesome/icons/link";
import Heading from "./Heading.vue";

export default {
  name: "AnchorItem",
  components: {
    ah: Heading
  },
  props: {
    to: {
      type: String,
      required: true
    },
    header: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
.header {
  margin: 1rem 0;
}
.anchor {
  display: block;
  position: relative;
  top: -5rem;
  visibility: hidden;
}
.anchor-link {
  color: unset;
}
.anchor-icon {
  visibility: hidden;
  position: absolute;
  right: calc(100% + 1rem);
  color: gray;
}
.anchor-link:hover .anchor-icon {
  visibility: visible;
}
</style>
