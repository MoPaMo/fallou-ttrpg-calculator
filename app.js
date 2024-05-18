const HomeComponent = {
  template: `
      <div>
        <p class="mb-4 text-lg" v-if="remainingPoints > 0">
          You have {{ remainingPoints }} points left to distribute.
        </p>
        <p class="mb-4 text-lg" v-else-if="remainingPoints == 0">
          You have used all points.
        </p>
        <p class="mb-4 text-lg" v-else>
          You must get rid of {{ -remainingPoints }} points.
        </p>
        <div class="flex space-x-4 mb-6">
          <div v-for="stat in stats" :key="stat.name" class="flex-1 text-center">
            <div class="flex items-center justify-center mb-2 relative group">
              <i :class="stat.icon + ' mr-1'"></i>
              <span class="text-xs group-hover:hidden">{{ stat.abbr }}</span>
              <span class="text-xs group-hover:block hidden">{{ stat.name }}</span>
            </div>
            <input type="number" class="w-full p-2 text-lg text-center border-b-0 border-yellow-400 focus:outline-none invalid:color-red-500" v-model.number="stat.value" min="1" max="10" />
            <br />
            <span class="inline-block bg-yellow-400 text-gray-700 rounded-full px-2 py-1 text-sm">
              {{ calculateModifier(stat.value) }}
            </span>
          </div>
        </div>
      </div>
    `,
  data() {
    return {
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
        {
          name: "Charisma",
          abbr: "CHA",
          icon: "fa-solid fa-comment",
          value: 1,
        },
        {
          name: "Intelligence",
          abbr: "INT",
          icon: "fa-solid fa-brain",
          value: 1,
        },
        { name: "Agility", abbr: "AGI", icon: "fas fa-running", value: 1 },
        { name: "Luck", abbr: "LCK", icon: "fas fa-clover", value: 1 },
      ],
    };
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
  },
};

const AboutComponent = {
  template: `
      <div>
        <h2 class="text-2xl mb-4">About</h2>
        <p>This is an about page for the Fallout RPG Character Builder.</p>
      </div>
    `,
};

// Define routes
const routes = [
  { path: "/", component: HomeComponent },
  { path: "/about", component: AboutComponent },
];

// Create the router instance
const router = new VueRouter({
  routes,
});

// Initialize Vue instance with router
new Vue({
  el: "#app",
  router,
});
