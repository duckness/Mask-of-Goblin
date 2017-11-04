<template>
  <article class="media" id="hero-attributes">
    <figure class="media-left">
      <p class="image is-128x128">
        <img :src="classIcon">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p>
          <strong class="title is-5">Base Stats</strong>
          <br>Note that critical power (1000) and block power (500) have hidden base values for all heroes, those base values are not shown in the table.
        </p>
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
            <tr v-for="key in Object.keys(stats)" :key="key">
              <td>{{ key }}</td>
              <td>{{ stats[key] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'attributes',
  props: ['stats', 'hclass'],
  computed: {
    classIcon: function () {
      return require('./images/classes/' + this.hclass + '.png')
    }
  }
}
</script>
