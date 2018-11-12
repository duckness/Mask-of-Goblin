<template>
  <div
    id="artifact-options"
    class="columns"
  >
    <div class="column" />
    <div class="column is-narrow">
      <star-selector />
    </div>
  </div>
</template>

<script>
import StarSelector from "@/components/StarSelector.vue";

export default {
  name: "ArtifactOptions",
  components: {
    "star-selector": StarSelector
  }
};
</script>
