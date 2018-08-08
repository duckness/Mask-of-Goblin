<template>
  <div class="hero-section">
    <slot />
  </div>
</template>

<script>
export default {
  name: "HeroSection"
};
</script>

<style>
.hero-section + .hero-section {
  padding-top: 1rem;
}
.hero-section:last-child {
  padding-bottom: 2rem;
}
</style>
