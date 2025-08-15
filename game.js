// --- Initialization ---
let score = parseFloat(localStorage.getItem("score")) || 0;
let clickPower = parseFloat(localStorage.getItem("clickPower")) || 1;
let prestigeMultiplier = parseInt(localStorage.getItem("prestigeMultiplier")) || 1;
let prestigeLevel = parseInt(localStorage.getItem("prestigeLevel")) || 0;
let autoClickers = {tier1: 0, tier2: 0, tier3: 0};

const scoreDisplay = document.getElementById("score");
const clickPowerDisplay = document.getElementById("click-power");
const prestigeMultiplierDisplay = document.getElementById("prestige-multiplier");
const fireBtn = document.getElementById("fire-btn");
const shopList = document.getElementById("upgrade-list");
const prestigeBtn = document.getElementById("prestige-btn");
const resetBtn = document.getElementById("reset-progress");

// --- Big number formatting ---
function formatNumber(num) {
    const units = ["","K","M","B","T","Qa","Qi","Sx"];
    let unitIndex = 0;
    while(num >= 1000 && unitIndex < units.length-1){
        num /= 1000;
        unitIndex++;
    }
    return num.toFixed(2)+" "+units[unitIndex];
}

// --- Upgrade setup ---
const upgrades = [];
let costs = [
1,5,10,50,100,200,500,1000,2000,5000,10000,20000,50000,
100000,200000,500000,1000000,2000000,5000000,10000000,20000000,50000000,
100000000,200000000,500000000,1000000000,2000000000,5000000000,
10000000000,20000000000,50000000000,100000000000,200000000000,500000000000,
1000000000000,2000000000000,5000000000000,10000000000000,20000000000000,50000000000000,
100000000000000,200000000000000,500000000000000,1000000000000000,2000000000000000,
5000000000000000,10000000000000000,20000000000000000,50000000000000000,
100000000000000000,200000000000000000,500000000000000000,1000000000000000000
];

// Assign type and name
costs.forEach((c,i)=>{
    let type = i<6?"click": i<15?"auto": "prestige";
    let name = type==="click"? "Fire Click" : type==="auto"? "Auto Clicker" : "Prestige Boost";
    upgrades.push({cost: c, name: name, type: type, level: 0});
});

// Emoji mapping
function getEmoji(type){
    switch(type){
        case "click": return "🔥";
        case "auto": return "⚡";
        case "prestige": return "💎";
        default: return "❓";
    }
}

// --- Create upgrade buttons ---
function createUpgradeButtons(){
    shopList.innerHTML = "";
    upgrades.forEach(upg=>{
        const btn = document.createElement("button");
        btn.className="upgrade-btn";
        const emoji = getEmoji(upg.type);
        btn.textContent = `${emoji} ${upg.name} (Cost: ${formatNumber(upg.cost)}) Lv: ${upg.level}`;
        
        btn.addEventListener("click", ()=>{
            if(score >= upg.cost){
                score -= upg.cost;

                if(upg.type==="click") clickPower +=1;
                if(upg.type==="auto"){
                    if(upg.level<5) autoClickers.tier1 +=1;
                    else if(upg.level<10) autoClickers.tier2 +=1;
                    else autoClickers.tier3 +=1;
                }
                if(upg.type==="prestige"){
                    prestigeLevel++;
                    prestigeMultiplier *=10;
                    score=0;
                    clickPower=1;
                    autoClickers={tier1:0,tier2:0,tier3:0};
                }

                upg.level +=1;
                upg.cost = Math.floor(upg.cost * 1.5);
                updateDisplay();
                createUpgradeButtons(); // refresh
            }
        });

        shopList.appendChild(btn);
    });
}
createUpgradeButtons();

// --- Fire click animations ---
function animateFire(){
    fireBtn.style.transform="scale(1.5)";
    setTimeout(()=>{fireBtn.style.transform="scale(1)";},100);
}
function createSpark(){
    const spark = document.createElement("div");
    spark.className="spark";
    const size = Math.random()*15+10;
    spark.style.width=size+"px";
    spark.style.height=size+"px";
    spark.style.left=Math.random()*160+"px";
    spark.style.bottom="0px";
    document.getElementById("fire-container").appendChild(spark);
    setTimeout(()=>spark.remove(),700);
}
fireBtn.addEventListener("click", ()=>{
    score += clickPower*prestigeMultiplier;
    updateDisplay();
    animateFire();
    createSpark();
});

// --- Auto-clickers ---
setInterval(()=>{
    const totalAuto = autoClickers.tier1 + autoClickers.tier2*10 + autoClickers.tier3*100;
    if(totalAuto>0){
        score += totalAuto*prestigeMultiplier;
        updateDisplay();
        for(let i=0;i<Math.min(totalAuto,5);i++) createSpark();
        fireBtn.style.transform="scale(1.2)";
        setTimeout(()=>fireBtn.style.transform="scale(1)",100);
    }
},1000);

// --- Prestige ---
function prestigeCost(){ return 1e9*Math.pow(10,prestigeLevel); }
prestigeBtn.addEventListener("click", ()=>{
    if(score>=prestigeCost()){
        prestigeLevel++;
        prestigeMultiplier*=10;
        score=0;
        clickPower=1;
        autoClickers={tier1:0,tier2:0,tier3:0};
        localStorage.setItem("prestigeMultiplier",prestigeMultiplier);
        localStorage.setItem("prestigeLevel",prestigeLevel);
        updateDisplay();
        alert(`Prestige complete! Multiplier x${prestigeMultiplier}`);
    }
});

// --- Reset ---
resetBtn.addEventListener("click", ()=>{
    if(confirm("Reset everything?")){
        score=0; clickPower=1; prestigeMultiplier=1; prestigeLevel=0;
        autoClickers={tier1:0,tier2:0,tier3:0};
        upgrades.forEach(u=>{u.level=0; u.cost=u.cost;});
        localStorage.clear();
        updateDisplay();
        createUpgradeButtons();
    }
});

// --- Update Display ---
function updateDisplay(){
    scoreDisplay.textContent = formatNumber(score);
    clickPowerDisplay.textContent = clickPower;
    prestigeMultiplierDisplay.textContent = prestigeMultiplier+"x";
    prestigeBtn.textContent = `Prestige (Cost: ${formatNumber(prestigeCost())})`;
    localStorage.setItem("score",score);
    localStorage.setItem("clickPower",clickPower);
}
updateDisplay();
