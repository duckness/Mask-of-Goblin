<template>
  <div>
    <description/>
    <options/>
  </div>
</template>

<script>
import Description from "./Description.vue";
import Options from "./Options.vue";

export default {
  name: "Artifact",
  components: {
    description: Description,
    options: Options
  }
};
</script>
