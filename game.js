let score = 0;
const scoreDisplay = document.getElementById("score");
const fireBtn = document.getElementById("fire-btn");

fireBtn.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
});
