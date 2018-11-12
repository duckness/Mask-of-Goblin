<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <span class="is-italic">Made with <icon
          id="heart-logo"
          name="heart"
        /> by duckness/TRAPPED</span>
      </div>
    </div>
  </footer>
</template>

<script>
import "vue-awesome/icons/brands/github";
import "vue-awesome/icons/heart";

export default {
  name: "MogFooter"
};
</script>

<style scoped>
.footer {
  background-color: transparent;
  position: absolute;
  bottom: 0;
  padding-bottom: 1.5rem;
}
#heart-logo {
  width: auto;
  height: 1rem;
  vertical-align: -2px;
}
</style>
