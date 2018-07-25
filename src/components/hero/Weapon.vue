<template>
  <article id="uw" class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="weapon.image">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <small class="subtitle is-6">{{ $t('ui.weapon') }}</small>
        <br>
        <strong class="title is-5">{{ weapon.name }} </strong>
        <small class="subtitle is-6">({{ attack + ' ' + $t('ui.atk') }})</small>
        <br> {{ weapon.description[star] }}
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
  name: "Weapon",
  props: {
    weapon: {
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
      attack: "getUAtk"
    })
  }
};
</script>

<style>
#uw {
  margin: 1rem 0rem;
  padding: 1rem 0rem;
}
</style>
