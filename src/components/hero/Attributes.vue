<template>
  <article id="hero-attributes" class="media">
    <figure class="media-left">
      <p class="image is-128x128">
        <lazyimg :src="attributes.image" />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <!--p>
          <strong class="title is-5">Base Stats</strong>
          <br>Note that critical power (1000) and block power (500) have hidden base values for all heroes, those base values are not shown in the table.
        </p-->
        <div class="columns">
          <div class="column is-one-quarter">
            <label class="label">{{ $t('ui.mpatk') }}</label>
            <div class="field ">
              <div class="control is-expanded">
                <input class="input" type="number" v-model.number="mpatkValue">
              </div>
            </div>
            <label class="label">{{ $t('ui.aspd') }}</label>
            <div class="field ">
              <div class="control is-expanded">
                <input class="input" type="number" v-model.number="aspdValue">
              </div>
            </div>
          </div>
          <div class="column is-three-quarters">
              <table class="table is-hoverable is-fullwidth">
              <thead>
                <th>Type</th>
                <th>Value</th>
              </thead>
              <tbody>
                <tr>
                  <td>Autoattack Cycle</td>
                  <td>{{ rounding(effCycle) }}s</td>
                </tr>
                <tr>
                  <td>Autoattack Hits</td>
                  <td>{{ effHits }}</td>
                </tr>
                <tr>
                  <td>Effective MP/Atk per "hit"</td>
                  <td>{{ Math.floor(effMpatkhit) }}</td>
                </tr>
                <tr>
                  <td>Effective MP/Atk per second</td>
                  <td>{{ Math.round(effMpatksec) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br>
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
import { softcap } from "@/mixins/softcap";
import LazyImg from "@/components/LazyImg.vue";

export default {
  name: "Attributes",
  mixins: [softcap],
  props: {
    attributes: {
      type: Object,
      required: true
    },
    auto: {
      type: Object,
      required: true
    }
  },
  components: {
    lazyimg: LazyImg
  },
  data: function() {
    return {
      mpatkValue: 0,
      aspdValue: 1000
    };
  },
  computed: {
    effCycle: function() {
      return this.effDuration(this.auto.duration);
    },
    effHits: function() {
      var s = "";
      for (var i = 0; i < this.auto.hits.length; i++) {
        s +=
          "(" +
          String(this.effHitsHelper(this.auto.hits[i])).replace(/,/g, "s, ") +
          "s), ";
      }
      return s.slice(0, -2);
    },
    effMpatkhit: function() {
      return this.attributes.stats.mpatk * this.mpatkCapped;
    },
    effMpatksec: function() {
      var avgHitsPerSec = this.auto.hits.length / this.effCycle;
      return this.effMpatkhit * avgHitsPerSec;
    },
    mpatkCapped: function() {
      return 1 + this.actualStat(this.mpatk, this.mpatkValue) / 100.0;
    },
    aspdCapped: function() {
      return this.actualStat(this.aspd, this.aspdValue) / 100.0;
    }
  },
  methods: {
    effHitsHelper: function(arr) {
      var a = [];
      for (var i = 0; i < arr.length; i++) {
        a.push(this.rounding(arr[i] / this.aspdCapped));
      }
      return a;
    },
    effDuration: function(time_) {
      return time_ / this.aspdCapped;
    },
    rounding: function(decimal) {
      return Math.round(decimal * 1000) / 1000;
    }
  }
};
</script>
