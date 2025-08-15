let score = parseFloat(localStorage.getItem("score")) || 0;
let clickPower = parseFloat(localStorage.getItem("clickPower")) || 1;
let prestigeMultiplier = parseInt(localStorage.getItem("prestigeMultiplier")) || 1;
let prestigeLevel = parseInt(localStorage.getItem("prestigeLevel")) || 0;

const scoreDisplay = document.getElementById("score");
const clickPowerDisplay = document.getElementById("click-power");
const prestigeMultiplierDisplay = document.getElementById("prestige-multiplier");
const fireBtn = document.getElementById("fire-btn");
const shopList = document.getElementById("upgrade-list");
const prestigeBtn = document.getElementById("prestige-btn");
const resetBtn = document.getElementById("reset-progress");

// Format big numbers
function formatNumber(num) {
    const units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De"];
    let unitIndex = 0;
    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }
    return num.toFixed(2) + " " + units[unitIndex];
}

// Upgrade cost list
const upgradeCosts = [
    1, 5, 10, 50, 100, 200, 500, 1000, 2000, 5000,
    10000, 20000, 50000, 100000, 200000, 500000,
    1000000, 2000000, 5000000, 10000000, 20000000, 50000000,
    100000000, 200000000, 500000000,
    1000000000, 2000000000, 5000000000, 10000000000, 20000000000, 50000000000,
    100000000000, 200000000000, 500000000000,
    1000000000000, 2000000000000, 5000000000000, 10000000000000, 20000000000000, 50000000000000,
    100000000000000, 200000000000000, 500000000000000,
    1000000000000000, 2000000000000000, 5000000000000000,
    10000000000000000, 20000000000000000, 50000000000000000,
    100000000000000000, 200000000000000000, 500000000000000000,
    1000000000000000000, 2000000000000000000, 5000000000000000000,
    10000000000000000000
];

// Generate shop buttons
upgradeCosts.forEach((cost, index) => {
    const btn = document.createElement("button");
    btn.textContent = `+1 Click Power (Cost: ${formatNumber(cost)})`;
    btn.className = "upgrade-btn";
    btn.addEventListener("click", () => {
        if (score >= cost) {
            score -= cost;
            clickPower += 1;
            updateDisplay();
        }
    });
    shopList.appendChild(btn);
});

// Fire click
fireBtn.addEventListener("click", () => {
    score += clickPower * prestigeMultiplier;
    updateDisplay();
});

// Prestige
function prestigeCost() {
    return 1e9 * Math.pow(10, prestigeLevel); // Prestige cost grows 10x each time
}

prestigeBtn.addEventListener("click", () => {
    if (score >= prestigeCost()) {
        prestigeLevel++;
        prestigeMultiplier *= 10;
        score = 0;
        clickPower = 1;
        localStorage.setItem("prestigeMultiplier", prestigeMultiplier);
        localStorage.setItem("prestigeLevel", prestigeLevel);
        updateDisplay();
        alert(`Prestige complete! Multiplier is now x${prestigeMultiplier}`);
    }
});

// Reset progress
resetBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset?")) {
        score = 0;
        clickPower = 1;
        prestigeMultiplier = 1;
        prestigeLevel = 0;
        localStorage.clear();
        updateDisplay();
    }
});

// Update screen
function updateDisplay() {
    scoreDisplay.textContent = formatNumber(score);
    clickPowerDisplay.textContent = clickPower;
    prestigeMultiplierDisplay.textContent = prestigeMultiplier + "x";
    prestigeBtn.textContent = `Prestige (Cost: ${formatNumber(prestigeCost())})`;
    localStorage.setItem("score", score);
    localStorage.setItem("clickPower", clickPower);
}

updateDisplay();
