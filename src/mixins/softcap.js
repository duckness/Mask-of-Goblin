export const softcap = {
  data: function() {
    return {
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
    actualStat: function(statType, istat) {
      var actual = 0;
      // variable names are fucked cause vespa
      if (istat === 0) {
        actual = 0;
        // 2nd upper softcap
      } else if (istat > statType.X1) {
        actual = this.attenuateInv(
          istat,
          statType.MaxK,
          statType.A1,
          statType.B1
        );
        // 1st upper softcap
      } else if (istat > statType.X2) {
        actual = Math.floor((istat * statType.A2) / 1000) + statType.B2;
        // 2nd lower softcap
      } else if (istat < statType.X3) {
        actual = this.attenuateInv(
          istat,
          statType.MinK,
          statType.A3,
          statType.B3
        );
        // 1st lower softcap
      } else if (istat < statType.X4) {
        actual = this.attenuate(istat, statType.MinK, statType.A4, statType.B4);
        // uncapped
      } else {
        actual = istat;
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
