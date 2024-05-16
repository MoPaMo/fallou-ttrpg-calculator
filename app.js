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
    skills: [
      { name: "Athletics", attributes: ["STR"] },
      { name: "Barter", attributes: ["CHA"] },
      { name: "Breach", attributes: ["PER", "INT"] },
      { name: "Energy Weapons", attributes: ["PER"] },
      { name: "Explosives", attributes: ["PER"] },
      { name: "Guns", attributes: ["AGI"] },
      { name: "Lockpick", attributes: ["PER", "AGI"] },
      { name: "Medicine", attributes: ["INT", "PER"] },
      { name: "Melee Weapons", attributes: ["STR", "AGI"] },
      { name: "Repair", attributes: ["INT"] },
      { name: "Science", attributes: ["INT"] },
      { name: "Sneak", attributes: ["AGI"] },
      { name: "Speech", attributes: ["CHA"] },
      { name: "Survival", attributes: ["END", "INT"] },
      { name: "Unarmed", attributes: ["STR", "AGI"] },
    ],
  },
  computed: {
    remainingPoints() {
      let usedPoints = this.stats.reduce((acc, stat) => acc + stat.value, 0);
      return this.totalPoints - usedPoints;
    },
  },
  methods: {
    calculateModifier(value) {
      return value - 5;
    },
    calculateSkillModifier(skill) {
      let highestModifier = skill.attributes
        .map((attr) => {
          let stat = this.stats.find((s) => s.abbr === attr);
          return this.calculateModifier(stat.value);
        })
        .reduce((a, b) => Math.max(a, b), -Infinity);
      return highestModifier;
    },
    formatAttributes(attributes) {
      return attributes.join(" or ");
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
});
