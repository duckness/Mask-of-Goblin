<template>
  <article id="hero-attributes" class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="attributes.image">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <!--p>
          <strong class="title is-5">Base Stats</strong>
          <br>Note that critical power (1000) and block power (500) have hidden base values for all heroes, those base values are not shown in the table.
        </p-->
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <th>Type</th>
            <th>Value</th>
          </thead>
          <tfoot>
            <th>Type</th>
            <th>Value</th>
          </tfoot>
          <tbody>
            <tr v-for="key in Object.keys(attributes.stats)" :key="key">
              <td>{{ $t('ui.' + key) }}</td>
              <td>{{ attributes.stats[key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "Attributes",
  props: {
    attributes: {
      type: Object,
      required: true
    }
  }
};
</script>
