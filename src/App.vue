<template>
  <div id="app">
    <navbar/>
    <section id="content" class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-three-quarters">
            <div class="box">
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </section>
    <mogfooter/>
  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar.vue";
import MogFooter from "./components/layout/MogFooter.vue";

export default {
  name: "App",
  components: {
    navbar: Navbar,
    mogfooter: MogFooter
  },
  computed: {
    locale: {
      get() {
        return this.$store.state.locale;
      }
    }
  },
  metaInfo: function() {
    return {
      htmlAttrs: {
        lang: this.locale
      },
      link: [{ rel: "shortcut icon", type: "image/png", href: "/favicon.png" }]
    };
  },
  watch: {
    $route(to, from) {
      // make sure back button doesn't act funky
      if (from.name === to.name) {
        if (to.name === "hero") {
          this.$store.state.heroID = to.params.id;
        } else if (to.name === "artifact") {
          this.$store.state.artifactID = to.params.id;
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$route.name === "hero") {
        this.$store.state.heroID = this.$route.params.id;
      } else if (this.$route.name === "artifact") {
        this.$store.state.artifactID = this.$route.params.id;
      }
    });
  }
};
</script>

<style lang="scss">
@import "~buefy/lib/buefy.css";

#app {
  background-color: #f5f5f5;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#content {
  position: relative;
  padding: 1.5rem 1.5rem;
  margin: 3.25rem 0 6rem;
}
.fa-icon {
  width: auto;
  height: 1em;
}
.label.no-margin-bottom:not(:last-child) {
  margin-bottom: 0;
}
.no-margin-columns {
  margin: 0;
}
.no-margin-columns:last-child {
  margin: 0;
}
.media-content {
  overflow: hidden;
  > .content {
    margin-bottom: 1.25rem;
  }
}
.card-content {
  padding: 1.25rem 1.25rem 0rem;
}
</style>
