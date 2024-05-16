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
      { name: "Athletics", attributes: ["STR"], icon: "fa-solid fa-running" },
      { name: "Barter", attributes: ["CHA"], icon: "fa-solid fa-handshake" },
      {
        name: "Breach",
        attributes: ["PER", "INT"],
        icon: "fa-solid fa-door-open",
      },
      { name: "Energy Weapons", attributes: ["PER"], icon: "fa-solid fa-bolt" },
      { name: "Explosives", attributes: ["PER"], icon: "fa-solid fa-bomb" },
      { name: "Guns", attributes: ["AGI"], icon: "fa-solid fa-crosshairs" },
      { name: "Crafting", attributes: ["INT"], icon: "fa-solid fa-hammer" },
      {
        name: "Intimidation",
        attributes: ["STR", "CHA"],
        icon: "fa-solid fa-exclamation-triangle",
      },
      {
        name: "Medicine",
        attributes: ["INT", "PER"],
        icon: "fa-solid fa-briefcase-medical",
      },
      {
        name: "Melee Weapons",
        attributes: ["STR", "AGI"],
        icon: "fa-solid fa-fist-raised",
      },
      { name: "Repair", attributes: ["INT"], icon: "fa-solid fa-wrench" },
      { name: "Science", attributes: ["INT"], icon: "fa-solid fa-flask" },
      { name: "Sneak", attributes: ["AGI"], icon: "fa-solid fa-user-secret" },
      { name: "Speech", attributes: ["CHA"], icon: "fa-solid fa-comments" },
      {
        name: "Survival",
        attributes: ["END", "INT"],
        icon: "fa-solid fa-campground",
      },
      {
        name: "Unarmed",
        attributes: ["STR", "AGI"],
        icon: "fa-solid fa-hand-rock",
      },
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
      let luckStat = this.stats.find((s) => s.abbr === "LCK");
      let luckModifier = Math.floor(this.calculateModifier(luckStat.value) / 2);
      return highestModifier + luckModifier;
    },
    formatAttributes(attributes) {
      let fullNames = [];
      attributes.forEach((abbr) => {
        let stat = this.stats.find((stat) => stat.abbr === abbr);
        if (stat) {
          fullNames.push(stat.name);
        }
      });
      return fullNames.join(" or ");
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
