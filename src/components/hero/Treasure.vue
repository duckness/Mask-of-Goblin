<template>
  <article class="media ut">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="treasure.image">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <small class="subtitle is-6">{{ $t('ui.treasure') }}</small>
        <br>
        <strong class="title is-5">{{ treasure.name }} </strong>
        <small class="subtitle is-6">({{ hp + ' ' + $t('ui.hp') }})</small>
        <br> {{ treasure.description[star] }}
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

export default {
  name: "Treasure",
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
