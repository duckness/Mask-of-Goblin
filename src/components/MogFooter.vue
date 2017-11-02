<template>
  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <a id="github-link" href="https://github.com/duckness/Mask-of-Goblin"><icon id="github-logo" name="github"></icon></a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script>

import 'vue-awesome/icons/github'

export default {
  name: 'MogFooter'
}
</script>

<style>
#github-link {
  color: black;
}
#github-logo {
  width: auto;
  height: 2rem;
}
</style>


