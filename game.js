let score = 0;

// Number progression
const fireValues = [
    1, 5, 10, 50, 100, 200, 500,
    1000, 2000, 5000, 10000, 20000, 50000,
    100000, 200000, 500000,
    1000000, 2000000, 5000000,
    10000000, 20000000, 50000000,
    100000000, 200000000, 500000000,
    1000000000, 2000000000, 5000000000,
    10000000000, 20000000000, 50000000000,
    100000000000, 200000000000, 500000000000,
    1000000000000, 2000000000000, 5000000000000,
    10000000000000, 20000000000000, 50000000000000,
    100000000000000, 200000000000000, 500000000000000,
    1000000000000000, 2000000000000000, 5000000000000000,
    10000000000000000, 20000000000000000, 50000000000000000,
    100000000000000000, 200000000000000000, 500000000000000000,
    1000000000000000000, 2000000000000000000, 5000000000000000000,
    10000000000000000000, 20000000000000000000, 50000000000000000000,
    100000000000000000000, 200000000000000000000, 500000000000000000000,
    1000000000000000000000
];

// Fire-themed names
const fireNames = [
    "Spark","Ember","Flame","Blaze","Inferno","Firestorm","Wildfire",
    "Pyro","Scorch","Firebrand","Heatwave","Lava","Magma","Conflagration",
    "Hellfire","Phoenix","Solar Flare","Volcanic","Meteor Flame","Eternal Flame",
    "Dragonfire","Supernova","Sunburst","Fire Titan","Firelord","Infernal","Flame King",
    "Pyro Lord","Firestorm Overlord","Hell’s Wrath","Blaze Emperor","Flame God","Eternal Blaze",
    "Apocalyptic Fire","Cosmic Fire","Inferno Supreme","Universe on Fire","Fire Eternal",
    "Phoenix God","Celestial Flame","Fire Overlord","Ultimate Blaze","Immortal Flame",
    "Fire Beyond","Eternal Inferno","Cosmic Blaze","Supreme Pyro","Dragon Inferno","Eternal Pyro",
    "Apocalypse Flame","Firelord Supreme","Infinite Blaze","Flame Universe","Pyro Eternal",
    "Ultimate Fire","Fire God","Eternal Flame Titan","Celestial Inferno","Firelord Eternal",
    "Cosmic Pyro","Universe Blaze","Fire Beyond Infinity"
];

const scoreDisplay = document.getElementById("score");
const tierDisplay = document.getElementById("tier");
const clickButton = document.getElementById("clickButton");

clickButton.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = `🔥 Fire: ${score}`;

    // Check tier
    for (let i = fireValues.length - 1; i >= 0; i--) {
        if (score >= fireValues[i]) {
            tierDisplay.textContent = `Current Tier: ${fireNames[i]}`;
            break;
        }
    }
});

