<template>
  <div class="skill-section">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "SkillSection"
};
</script>

<style>
.skill-section + .skill-section {
  padding-top: 1rem;
}
.skill-section:last-child {
  padding-bottom: 2rem;
}
</style>
