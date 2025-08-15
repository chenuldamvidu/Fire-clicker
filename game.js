// --- Game variables ---
let score = parseInt(localStorage.getItem("score")) || 0;

// --- DOM elements ---
const scoreDisplay = document.getElementById("score");
const fireBtn = document.getElementById("fire-btn");
const upgradeList = document.getElementById("upgrade-list");
const leaderboardList = document.getElementById("leaderboard-list");

// --- Full Upgrades Array ---
const upgrades = [
  {name:"Spark", cost:1, level:0, power:1},
  {name:"Ember", cost:5, level:0, power:5},
  {name:"Flame", cost:10, level:0, power:10},
  {name:"Blaze", cost:50, level:0, power:50},
  {name:"Inferno", cost:100, level:0, power:100},
  {name:"Firestorm", cost:200, level:0, power:200},
  {name:"Wildfire", cost:500, level:0, power:500},
  {name:"Pyro", cost:1000, level:0, power:1000},
  {name:"Scorch", cost:2000, level:0, power:2000},
  {name:"Firebrand", cost:5000, level:0, power:5000},
  {name:"Heatwave", cost:10000, level:0, power:10000},
  {name:"Lava", cost:20000, level:0, power:20000},
  {name:"Magma", cost:50000, level:0, power:50000},
  {name:"Conflagration", cost:100000, level:0, power:100000},
  {name:"Hellfire", cost:200000, level:0, power:200000},
  {name:"Phoenix", cost:500000, level:0, power:500000},
  {name:"Solar Flare", cost:1000000, level:0, power:1000000},
  {name:"Volcanic", cost:2000000, level:0, power:2000000},
  {name:"Meteor Flame", cost:5000000, level:0, power:5000000},
  {name:"Eternal Flame", cost:10000000, level:0, power:10000000},
  {name:"Dragonfire", cost:20000000, level:0, power:20000000},
  {name:"Supernova", cost:50000000, level:0, power:50000000},
  {name:"Sunburst", cost:100000000, level:0, power:100000000},
  {name:"Fire Titan", cost:200000000, level:0, power:200000000},
  {name:"Firelord", cost:500000000, level:0, power:500000000},
  {name:"Infernal", cost:1000000000, level:0, power:1000000000},
  {name:"Flame King", cost:2000000000, level:0, power:2000000000},
  {name:"Pyro Lord", cost:5000000000, level:0, power:5000000000},
  {name:"Firestorm Overlord", cost:10000000000, level:0, power:10000000000},
  {name:"Hell’s Wrath", cost:20000000000, level:0, power:20000000000},
  {name:"Blaze Emperor", cost:50000000000, level:0, power:50000000000},
  {name:"Flame God", cost:100000000000, level:0, power:100000000000},
  {name:"Eternal Blaze", cost:200000000000, level:0, power:200000000000},
  {name:"Apocalyptic Fire", cost:500000000000, level:0, power:500000000000},
  {name:"Cosmic Fire", cost:1000000000000, level:0, power:1000000000000},
  {name:"Inferno Supreme", cost:2000000000000, level:0, power:2000000000000},
  {name:"Universe on Fire", cost:5000000000000, level:0, power:5000000000000},
  {name:"Fire Eternal", cost:10000000000000, level:0, power:10000000000000},
  {name:"Phoenix God", cost:20000000000000, level:0, power:20000000000000},
  {name:"Celestial Flame", cost:50000000000000, level:0, power:50000000000000},
  {name:"Fire Overlord", cost:100000000000000, level:0, power:100000000000000},
  {name:"Ultimate Blaze", cost:200000000000000, level:0, power:200000000000000},
  {name:"Immortal Flame", cost:500000000000000, level:0, power:500000000000000},
  {name:"Fire Beyond", cost:1000000000000000, level:0, power:1000000000000000},
  {name:"Eternal Inferno", cost:2000000000000000, level:0, power:2000000000000000},
  {name:"Cosmic Blaze", cost:5000000000000000, level:0, power:5000000000000000},
  {name:"Supreme Pyro", cost:10000000000000000, level:0, power:10000000000000000},
  {name:"Dragon Inferno", cost:20000000000000000, level:0, power:20000000000000000},
  {name:"Eternal Pyro", cost:50000000000000000, level:0, power:50000000000000000},
  {name:"Apocalypse Flame", cost:100000000000000000, level:0, power:100000000000000000},
  {name:"Firelord Supreme", cost:200000000000000000, level:0, power:200000000000000000},
  {name:"Infinite Blaze", cost:500000000000000000, level:0, power:500000000000000000},
  {name:"Flame Universe", cost:1000000000000000000, level:0, power:1000000000000000000},
  {name:"Pyro Eternal", cost:2000000000000000000, level:0, power:2000000000000000000},
  {name:"Ultimate Fire", cost:5000000000000000000, level:0, power:5000000000000000000},
  {name:"Fire God", cost:10000000000000000000, level:0, power:10000000000000000000},
  {name:"Eternal Flame Titan", cost:20000000000000000000, level:0, power:20000000000000000000},
  {name:"Celestial Inferno", cost:50000000000000000000, level:0, power:50000000000000000000},
  {name:"Firelord Eternal", cost:100000000000000000000, level:0, power:100000000000000000000},
  {name:"Cosmic Pyro", cost:200000000000000000000, level:0, power:200000000000000000000},
  {name:"Universe Blaze", cost:500000000000000000000, level:0, power:500000000000000000000},
  {name:"Fire Beyond Infinity", cost:1000000000000000000000, level:0, power:1000000000000000000000}
];

// --- Functions ---
function updateDisplay(){
  scoreDisplay.textContent = score;
  localStorage.setItem("score",score);
}

function calculateClickPower(){
  let clickPower = upgrades.reduce((sum,u)=> sum + u.level * u.power,0);
  return clickPower || 1;
}

function createFloatingNumber(amount,x,y){
  const floatNum = document.createElement("div");
  floatNum.className = "floating-number";
  floatNum.style.left = x + "px";
  floatNum.style.top = y + "px";
  floatNum.textContent = "+"+amount;
  document.getElementById("game-container").appendChild(floatNum);
  setTimeout(()=>floatNum.remove(),1000);
}

function refreshUpgrades(){
  upgradeList.innerHTML="";
  upgrades.forEach(u=>{
    const div = document.createElement("div");
    div.className = "upgrade";
    div.textContent = `${u.name} (Lv:${u.level}) Cost:${u.cost}`;
    div.addEventListener("click", ()=>{
      if(score >= u.cost){
        score -= u.cost;
        u.level +=1;
        u.cost = Math.floor(u.cost*2);
        updateDisplay();
        refreshUpgrades();
      }else{
        alert("Not enough score!");
      }
    });
    upgradeList.appendChild(div);
  });
}

function refreshLeaderboard(){
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboardList.innerHTML="";
  leaderboard.slice(0,10).forEach(item=>{
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.score}`;
    leaderboardList.appendChild(li);
  });
}

function saveLeaderboard(){
  let name = prompt("Enter your name for leaderboard (unique):","");
  if(!name) return;
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  if(leaderboard.find(l=>l.name===name)){
    alert("Name already exists!");
    return;
  }
  leaderboard.push({name:name, score:score});
  leaderboard.sort((a,b)=>b.score-a.score);
  localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
  refreshLeaderboard();
}

// --- Event Listeners ---
fireBtn.addEventListener("click",(e)=>{
  let clickPower = calculateClickPower();
  score += clickPower;
  updateDisplay();
  createFloatingNumber(clickPower,e.clientX-50,e.clientY-50);
});

document.getElementById("reset-game").addEventListener("click",()=>{
  if(confirm("Reset everything?")){
    score=0;
    upgrades.forEach(u=>{u.level=0; u.cost = Math.floor(u.cost/Math.pow(2,u.level));});
    updateDisplay();
    refreshUpgrades();
    refreshLeaderboard();
  }
});

document.getElementById("max-click-power").addEventListener("click",()=>{
  upgrades.forEach(u=>{u.level=999;});
  updateDisplay();
  refreshUpgrades();
  alert("Click power maxed!");
});

// --- Initialize ---
updateDisplay();
refreshUpgrades();
refreshLeaderboard();
window.addEventListener("beforeunload",saveLeaderboard);

