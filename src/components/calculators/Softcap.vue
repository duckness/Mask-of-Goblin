<template>
  <div id="softcap">
    <div class="columns is-centered level">
      <div class="column is-one-third">
        <label class="label">Initial Stat Value:</label>
        <div class="field ">
          <div class="control is-expanded">
            <input class="input" type="number" v-model.number="istat">
          </div>
        </div>
      </div>
      <div class="column is-two-thirds">
        <table class="table is-hoverable is-fullwidth">
          <thead>
            <th>Stat</th>
            <th>Softcap</th>
            <th>Actual Value</th>
          </thead>
          <tbody>
            <tr>
              <td>Crit</td><td>{{ crit.X2 }}</td><td>{{ actualStat(crit, istat) }}%</td>
            </tr>
            <tr>
              <td>Acc</td><td>{{ acc.X2 }}</td><td>{{ actualStat(acc, istat) }}%</td>
            </tr>
            <tr>
              <td>CC Acc</td><td>{{ ccacc.X1 }}</td><td>{{ actualStat(ccacc, istat) }}%</td>
            </tr>
            <tr>
              <td>Crit Resist</td><td>{{ critresist.X2 }}</td><td>{{ actualStat(critresist, istat) }}%</td>
            </tr>
            <tr>
              <td>CC Resist</td><td>{{ ccresist.X1 }}</td><td>{{ actualStat(ccresist, istat) }}%</td>
            </tr>
            <tr>
              <td>Dodge, Block, Lifesteal</td><td>{{ dodge.X2 }}</td><td>{{ actualStat(dodge, istat) }}%</td>
            </tr>
            <tr>
              <td>Penetration, Tough</td><td>{{ pen.X2 }}</td><td>{{ actualStat(pen, istat) }}%</td>
            </tr>
            <tr>
              <td>Attack Spd</td><td>{{ aspd.X2 }}</td><td>{{ actualStat(aspd, istat) }}%</td>
            </tr>
            <tr>
              <td>Block Def</td><td>{{ blockdef.X2 }}</td><td>{{ actualStat(blockdef, istat) }}%</td>
            </tr>
            <tr>
              <td>Mp/Atk</td><td>{{ mpatk.X2 }}</td><td>{{ actualStat(mpatk, istat) }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="content is-small">
      <strong class="is-6">Notes</strong>
      <br>
      <span>For each stat, there is a maximum of 2 negative softcaps, 2 positive softcaps, and 2 hardcaps for maximum/minimum values.
        <br>For brevity, only the first positive softcap is shown on the table.</span>
    </div>
  </div>
</template>

<script>
import { softcap } from "@/mixins/softcap";

export default {
  name: "softcap",
  mixins: [softcap],
  data: function() {
    return {
      istat: 0
    };
  }
};
</script>
