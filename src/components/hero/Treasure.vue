<template>
  <article class="media ut">
    <figure class="media-left">
      <p class="image is-128x128">
        <lazyimg :src="treasure.image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong class="title is-5">{{ treasure.name }} </strong>
        <small class="subtitle is-6">({{ hp + ' ' + $t('ui.hp') }})</small>
        <br> {{ treasure.description[star] }}
        <div 
          v-if="additionalInfo !== ''" 
          class="content is-small">
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
  name: "Treasure",
  components: {
    lazyimg: LazyImg
  },
  props: {
    treasure: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      additionalInfo: ""
    };
  },
  computed: {
    ...mapState(["star"]),
    ...mapGetters({
      hp: "getUHP"
    })
  }
};
</script>

<style>
.ut {
  margin-bottom: 1.25rem;
}
</style>
