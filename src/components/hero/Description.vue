<template>
  <article class="media" id="hero-description">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="itemImage">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong class="title is-4">{{ itemName }}</strong>
          <small class="subtitle is-5">{{ attack }}</small>
          <br> {{ description }}
          <div class="content is-small" v-if="additionalInfo !== ''">
            <label class="label no-margin-bottom">Additional Info</label>
            <span>{{ additionalInfo }}</span>
          </div>
        </p>
      </div>
    </div>
  </article>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'hero-description',
  computed: {
    ...mapGetters([
      'itemImage',
      'itemName',
      'attack',
      'description',
      'additionalInfo'
    ])
  }
}
</script>
