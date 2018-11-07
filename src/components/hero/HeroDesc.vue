<template>
  <article
    id="hero"
    class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <lazyimg :src="hero.image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <span>
          <strong class="title is-3">{{ hero.name }}</strong>
          <small class="subtitle is-5"> ({{ hero.class }})</small>
        </span>
        <br>
        <small class="subtitle is-5">{{ hero.subtitle }}</small>
        <br><span><a :href="linkWiki">Wiki</a> | <a :href="linkBuilder">Build this hero</a></span>
        <p>{{ hero.description }}</p>
        <div class="columns">
          <div class="column content">
            <label class="label no-margin-bottom">T5 Light</label>
            <span>{{ hero.t5.light }}</span>
            <div
              v-if="false"
              class="content is-small">
              <strong class="is-6">Notes</strong>
              <br>
              <span>{{ hero.t5.lightInfo }}</span>
            </div>
          </div>
          <div class="column content">
            <label class="label no-margin-bottom">T5 Dark</label>
            <span>{{ hero.t5.dark }}</span>
            <div
              v-if="false"
              class="content is-small">
              <strong class="is-6">Notes</strong>
              <br>
              <span>{{ hero.t5.darkInfo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import LazyImg from "@/components/LazyImg.vue";

export default {
  name: "HeroDesc",
  components: {
    lazyimg: LazyImg
  },
  props: {
    hero: {
      type: Object,
      required: true
    }
  },
  computed: {
    linkWiki: function() {
      return "http://www.kingsraid.wiki/index.php?title="; // + this.hero.nameEN;
    },
    linkBuilder: function() {
      return "https://angryraids.ml/#/"; // + this.hero.nameEN;
    }
  }
};
</script>
