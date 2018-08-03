<template>
  <div>
    <label class="label no-margin-bottom">Light</label>
    <span>{{ light }}</span>
    <label class="label no-margin-bottom">Dark</label>
    <span>{{ dark }}</span>
  </div>
</template>

<script>
export default {
  name: "Skillbooks",
  props: {
    light: {
      type: String,
      required: true
    },
    dark: {
      type: String,
      required: true
    }
  }
};
</script>
