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
              <td>Crit</td><td>{{ crit.X2 }}</td><td>{{ actualStat(crit) }}%</td>
            </tr>
            <tr>
              <td>Acc</td><td>{{ acc.X2 }}</td><td>{{ actualStat(acc) }}%</td>
            </tr>
            <tr>
              <td>CC Acc</td><td>{{ ccacc.X1 }}</td><td>{{ actualStat(ccacc) }}%</td>
            </tr>
            <tr>
              <td>Crit Resist</td><td>{{ critresist.X2 }}</td><td>{{ actualStat(critresist) }}%</td>
            </tr>
            <tr>
              <td>CC Resist</td><td>{{ ccresist.X1 }}</td><td>{{ actualStat(ccresist) }}%</td>
            </tr>
            <tr>
              <td>Dodge, Block, Lifesteal</td><td>{{ dodge.X2 }}</td><td>{{ actualStat(dodge) }}%</td>
            </tr>
            <tr>
              <td>Penetration, Tough</td><td>{{ pen.X2 }}</td><td>{{ actualStat(pen) }}%</td>
            </tr>
            <tr>
              <td>Attack Spd</td><td>{{ aspd.X2 }}</td><td>{{ actualStat(aspd) }}%</td>
            </tr>
            <tr>
              <td>Block Def</td><td>{{ blockdef.X2 }}</td><td>{{ actualStat(blockdef) }}%</td>
            </tr>
            <tr>
              <td>Mp/Atk</td><td>{{ mpatk.X2 }}</td><td>{{ actualStat(mpatk) }}%</td>
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
export default {
  name: "softcap",
  data: function() {
    return {
      istat: 0,
      crit: {
        MaxK: 2000,
        X1: 2000,
        A1: 1,
        B1: 1500,
        X2: 1500,
        A2: 500,
        B2: 750,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
      },
      acc: {
        MaxK: 2000,
        X1: 2000,
        A1: 1,
        B1: 1500,
        X2: 1500,
        A2: 500,
        B2: 750,
        MinK: -920,
        X3: -2,
        A3: 3,
        B3: -938,
        X4: 1,
        A4: 0,
        B4: 0
      },
      ccacc: {
        MaxK: 900,
        X1: 900,
        A1: 1000000,
        B1: 1000000,
        X2: 450,
        A2: 1000,
        B2: 0,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
      },
      dodge: {
        MaxK: 1000,
        X1: 1000,
        A1: 3,
        B1: 0,
        X2: 500,
        A2: 500,
        B2: 250,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
      },
      critresist: {
        MaxK: 2000,
        X1: 2000,
        A1: 1,
        B1: -500,
        X2: 1000,
        A2: 500,
        B2: 500,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
      },
      ccresist: {
        MaxK: 1000,
        X1: 1000,
        A1: 1000000,
        B1: 1000000,
        X2: 500,
        A2: 1000,
        B2: 0,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
      },
      pen: {
        MaxK: 900,
        X1: 1000,
        A1: 2,
        B1: 1000,
        X2: 450,
        A2: 409,
        B2: 266,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
      },
      aspd: {
        MaxK: 2500,
        X1: 2400,
        A1: 1,
        B1: -733,
        X2: 1600,
        A2: 500,
        B2: 800,
        MinK: 250,
        X3: -10000,
        A3: 0,
        B3: 0,
        X4: 500,
        A4: 1,
        B4: -1500
      },
      blockdef: {
        MaxK: 450,
        X1: 775,
        A1: 3,
        B1: 1500,
        X2: 225,
        A2: 204,
        B2: 179,
        MinK: -920,
        X3: -2,
        A3: 3,
        B3: -938,
        X4: -1,
        A4: 0,
        B4: 0
      },
      mpatk: {
        MaxK: 2300,
        X1: 2400,
        A1: 1,
        B1: -900,
        X2: 1200,
        A2: 500,
        B2: 600,
        MinK: 0,
        X3: -500,
        A3: 0,
        B3: 0,
        X4: 0,
        A4: 0,
        B4: 0
      }
    };
  },
  methods: {
    actualStat: function(statType) {
      var actual = 0;
      // variable names are fucked cause vespa
      if (this.istat === 0) {
        actual = 0;
        // 2nd upper softcap
      } else if (this.istat > statType.X1) {
        actual = this.attenuateInv(
          this.istat,
          statType.MaxK,
          statType.A1,
          statType.B1
        );
        // 1st upper softcap
      } else if (this.istat > statType.X2) {
        actual = Math.floor((this.istat * statType.A2) / 1000) + statType.B2;
        // 2nd lower softcap
      } else if (this.istat < statType.X3) {
        actual = this.attenuateInv(
          this.istat,
          statType.MinK,
          statType.A3,
          statType.B3
        );
        // 1st lower softcap
      } else if (this.istat < statType.X4) {
        actual = this.attenuate(
          this.istat,
          statType.MinK,
          statType.A4,
          statType.B4
        );
        // uncapped
      } else {
        actual = this.istat;
      }
      // return to 1 significant decimal place
      actual = Math.round(actual) / 10;
      return actual.toFixed(1);
    },
    attenuate: function(x, k, a, b) {
      return Math.floor((k * 1000000) / (a * x * x + b * x + 1000000));
    },
    attenuateInv: function(x, k, a, b) {
      return k - Math.floor((k * 1000000) / (a * x * x + b * x + 1000000));
    }
  }
};
</script>
