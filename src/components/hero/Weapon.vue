<template>
  <div>
    <anchoritem :header="3" to="uw">{{ $t('ui.weapon') }}</anchoritem>
    <article class="media">
      <figure class="media-left">
        <p class="image is-128x128">
          <lazyimg :src="weapon.image" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import LazyImg from "@/components/LazyImg.vue";
import AnchorItem from "@/components/anchor/Item.vue";

export default {
  name: "Weapon",
  components: {
    anchoritem: AnchorItem,
    lazyimg: LazyImg
  },
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
