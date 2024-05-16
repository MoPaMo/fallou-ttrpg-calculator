new Vue({
  el: "#app",
  data: {
    totalPoints: 38,
    stats: [
      {
        name: "Strength",
        abbr: "STR",
        icon: "fa-solid fa-hand-fist",
        value: 1,
      },
      { name: "Perception", abbr: "PER", icon: "fa-solid fa-eye", value: 1 },
      { name: "Endurance", abbr: "END", icon: "fas fa-clover", value: 1 },
      { name: "Charisma", abbr: "CHA", icon: "fa-solid fa-comment", value: 1 },
      {
        name: "Intelligence",
        abbr: "INT",
        icon: "fa-solid fa-brain",
        value: 1,
      },
      { name: "Agility", abbr: "AGI", icon: "fas fa-clover", value: 1 },
      { name: "Luck", abbr: "LCK", icon: "fas fa-clover", value: 1 },
    ],
  },
  computed: {
    remainingPoints() {
      let usedPoints = this.stats.reduce((acc, stat) => acc + stat.value, 0);
      return this.totalPoints - usedPoints;
    },
  },
  methods: {
    updateValue(stat, event) {
      let newValue = parseInt(event.target.value);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
        stat.value = newValue;
        this.validatePoints();
      }
    },
    validatePoints() {
      let totalUsedPoints = this.stats.reduce(
        (acc, stat) => acc + stat.value,
        0
      );
      if (totalUsedPoints > this.totalPoints) {
        let excess = totalUsedPoints - this.totalPoints;
        for (let stat of this.stats) {
          if (stat.value > 1 && excess > 0) {
            let reduction = Math.min(stat.value - 1, excess);
            stat.value -= reduction;
            excess -= reduction;
          }
        }
      }
    },
  },
  watch: {
    stats: {
      handler() {
        this.validatePoints();
      },
      deep: true,
    },
  },
  computed: {
    remainingPoints() {
      let usedPoints = this.stats.reduce((acc, stat) => acc + stat.value, 0);
      return this.totalPoints - usedPoints;
    },
  },
  created() {
    this.stats.forEach((stat) => {
      this.$set(stat, "modifier", this.calculateModifier(stat.value));
    });
  },
  methods: {
    updateValue(stat, event) {
      let newValue = parseInt(event.target.value);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 10) {
        stat.value = newValue;
        stat.modifier = this.calculateModifier(newValue);
        this.validatePoints();
      }
    },
    calculateModifier(value) {
      return value - 5;
    },
    validatePoints() {
      let totalUsedPoints = this.stats.reduce(
        (acc, stat) => acc + stat.value,
        0
      );
      if (totalUsedPoints > this.totalPoints) {
        let excess = totalUsedPoints - this.totalPoints;
        for (let stat of this.stats) {
          if (stat.value > 1 && excess > 0) {
            let reduction = Math.min(stat.value - 1, excess);
            stat.value -= reduction;
            excess -= reduction;
            stat.modifier = this.calculateModifier(stat.value);
          }
        }
      }
    },
  },
});
