<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <a 
            id="github-link" 
            href="https://github.com/duckness/Mask-of-Goblin"><icon 
              id="github-logo" 
              name="brands/github" /></a>
          <br>
          <span class="lightgrey"><em>Made with <icon 
            id="heart-logo" 
            name="heart" /> by duckness/TRAPPED</em></span>
        </p>
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
#github-link {
  color: black;
}
#github-logo {
  width: auto;
  height: 2rem;
}
.lightgrey {
  color: grey;
}
#heart-logo {
  width: auto;
  height: 1rem;
  vertical-align: -2px;
}
</style>
