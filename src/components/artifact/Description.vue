<template>
  <article class="media" id="artifact-description">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="itemImage">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong class="title is-4">{{ itemName }}</strong>
          <br> {{ description }}
          <div class="content is-small" v-if="additionalInfo !== ''">
            <strong class="is-6">Notes</strong>
            <br>
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
  name: 'artifact-description',
  computed: {
    ...mapGetters([
      'itemImage',
      'itemName',
      'description',
      'additionalInfo'
    ])
  }
}
</script>

