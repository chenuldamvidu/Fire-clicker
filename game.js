let score = parseInt(localStorage.getItem("score")) || 0;
let clickPower = parseInt(localStorage.getItem("clickPower")) || 1;
let autoClicks = parseInt(localStorage.getItem("autoClicks")) || 0;

const scoreDisplay = document.getElementById("score");
const fireBtn = document.getElementById("fire-btn");
const upgradeClickBtn = document.getElementById("upgrade-click");
const upgradeAutoBtn = document.getElementById("upgrade-auto");

function updateDisplay() {
    scoreDisplay.textContent = score;
    localStorage.setItem("score", score);
    localStorage.setItem("clickPower", clickPower);
    localStorage.setItem("autoClicks", autoClicks);
}

// Click to earn
fireBtn.addEventListener("click", () => {
    score += clickPower;
    updateDisplay();
});

// Upgrade: More click power
upgradeClickBtn.addEventListener("click", () => {
    const cost = 50 * clickPower;
    if (score >= cost) {
        score -= cost;
        clickPower++;
        updateDisplay();
        upgradeClickBtn.textContent = `Increase Click Power (Cost: ${50 * clickPower})`;
    }
});

// Upgrade: Auto click
upgradeAutoBtn.addEventListener("click", () => {
    const cost = 200 * (autoClicks + 1);
    if (score >= cost) {
        score -= cost;
        autoClicks++;
        updateDisplay();
        upgradeAutoBtn.textContent = `Auto Click (Cost: ${200 * (autoClicks + 1)})`;
    }
});

// Auto click loop
setInterval(() => {
    score += autoClicks;
    updateDisplay();
}, 1000);

// Initial display
updateDisplay();
upgradeClickBtn.textContent = `Increase Click Power (Cost: ${50 * clickPower})`;
upgradeAutoBtn.textContent = `Auto Click (Cost: ${200 * (autoClicks + 1)})`;
