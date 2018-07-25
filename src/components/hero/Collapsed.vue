<template>
  <b-collapse :open="false" class="card is-fullwidth">
    <div slot="trigger" slot-scope="collapseProps" class="card-header">
      <p class="card-header-title">{{ title }}</p>
      <span :class="{ 'is-active':collapseProps.open }" class="card-header-icon">
        <icon class="angled-pointer" name="angle-right"/>
      </span>
    </div>
    <div class="card-content">
      <slot/>
    </div>
  </b-collapse>
</template>

<script>
import "vue-awesome/icons/angle-right";

export default {
  name: "Collapsed",
  props: {
    title: {
      type: String,
      default: "content"
    }
  }
};
</script>

<style lang="scss">
.card {
  &.is-fullwidth {
    width: auto;
    max-width: unset;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    box-shadow: 0 0 0 1px hsla(0, 0%, 4%, 0.1), -1px 0 0 0 hsla(0, 0%, 96%, 1),
      1px 0 0 0 hsla(0, 0%, 96%, 1);
    &.is-last {
      margin-bottom: 1.25rem;
    }
    .card-header-icon {
      transition: transform 0.2s ease;
      &.is-active {
        transform: rotate(90deg);
      }
    }
    :hover {
      .angled-pointer {
        color: black;
      }
    }
    .angled-pointer {
      color: #7957d5;
    }
  }
}
</style>
