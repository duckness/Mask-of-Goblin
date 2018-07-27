<template>
  <article id="artifact-description" class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <lazyimg :src="artifact.image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong class="title is-4">{{ artifact.name }}</strong>
        <br> {{ artifact.description[star] }}
        <div v-if="additionalInfo !== ''" class="content is-small">
          <strong class="is-6">Notes</strong>
          <br>
          <span>{{ additionalInfo }}</span>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LazyImg from "@/components/LazyImg.vue";

export default {
  name: "ArtifactDescription",
  components: {
    lazyimg: LazyImg
  },
  data() {
    return {
      additionalInfo: ""
    };
  },
  computed: {
    ...mapState(["star"]),
    ...mapGetters({
      artifact: "getArtifact"
    })
  }
};
</script>

<style>
#artifact-description {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}
</style>
