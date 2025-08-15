// --- Initialization ---
let score = parseFloat(localStorage.getItem("score")) || 0;
let clickPower = parseFloat(localStorage.getItem("clickPower")) || 1;
let autoClickers = {tier1:0, tier2:0, tier3:0};

const scoreDisplay = document.getElementById("score");
const clickPowerDisplay = document.getElementById("click-power");
const fireBtn = document.getElementById("fire-btn");
const shopList = document.getElementById("upgrade-list");
const resetBtn = document.getElementById("reset-progress");

// --- Big number formatting ---
function formatNumber(num){
    const units = ["","K","M","B","T","Qa","Qi","Sx"];
    let unitIndex=0;
    while(num>=1000 && unitIndex<units.length-1){
        num/=1000;
        unitIndex++;
    }
    return num.toFixed(2)+" "+units[unitIndex];
}

// --- Upgrade names from your list ---
const upgradeNames = [
"Spark","Ember","Flame","Blaze","Inferno","Firestorm","Wildfire","Pyro","Scorch","Firebrand",
"Heatwave","Lava","Magma","Conflagration","Hellfire","Phoenix","Solar Flare","Volcanic","Meteor Flame",
"Eternal Flame","Dragonfire","Supernova","Sunburst","Fire Titan","Firelord","Infernal","Flame King",
"Pyro Lord","Firestorm Overlord","Hell’s Wrath","Blaze Emperor","Flame God","Eternal Blaze","Apocalyptic Fire",
"Cosmic Fire","Inferno Supreme","Universe on Fire","Fire Eternal","Phoenix God","Celestial Flame","Fire Overlord",
"Ultimate Blaze","Immortal Flame","Fire Beyond","Eternal Inferno","Cosmic Blaze","Supreme Pyro","Dragon Inferno",
"Eternal Pyro","Apocalypse Flame","Firelord Supreme","Infinite Blaze","Flame Universe","Pyro Eternal",
"Ultimate Fire","Fire God","Eternal Flame Titan","Celestial Inferno","Firelord Eternal","Cosmic Pyro",
"Universe Blaze","Fire Beyond Infinity"
];

// --- Upgrade costs ---
const costs=[
1,5,10,50,100,200,500,1000,2000,5000,10000,20000,50000,
100000,200000,500000,1000000,2000000,5000000,10000000,20000000,50000000,
100000000,200000000,500000000,1000000000,2000000000,5000000000,
10000000000,20000000000,50000000000,100000000000,200000000000,500000000000,
1000000000000,2000000000000,5000000000000,10000000000000,20000000000000,50000000000000,
100000000000000,200000000000000,500000000000000,1000000000000000,2000000000000000,
5000000000000000,10000000000000000,20000000000000000,50000000000000000,
100000000000000000,200000000000000000,500000000000000000,1000000000000000000
];

// --- Create upgrades with click/auto mixed ---
const upgrades = costs.map((c,i)=>{
    let type = i%2===0 ? "click" : "auto"; // alternating
    let name = upgradeNames[i] || `Upgrade ${i+1}`;
    return {cost:c, name:name, type:type, level:0};
});

// Emoji mapping
function getEmoji(type){
    return type==="click" ? "🔥" : "⚡";
}

// --- Create upgrade buttons ---
function createUpgradeButtons(){
    shopList.innerHTML="";
    upgrades.sort((a,b)=>a.cost-b.cost);
    upgrades.forEach((upg,index)=>{
        const btn = document.createElement("button");
        btn.className="upgrade-btn";
        btn.textContent = `${getEmoji(upg.type)} ${upg.name} | Cost: ${formatNumber(upg.cost)} | Lv: ${upg.level}`;

        btn.onclick = ()=>{
            if(score>=upg.cost){
                score-=upg.cost;

                // Upgrade effects
                if(upg.type==="click") clickPower+=1;
                if(upg.type==="auto"){
                    if(upg.level<5) autoClickers.tier1+=1;
                    else if(upg.level<10) autoClickers.tier2+=1;
                    else autoClickers.tier3+=1;
                }

                upg.level+=1;
                upg.cost = Math.floor(upg.cost*1.5);
                updateDisplay();
                createUpgradeButtons();
            }
        }

        shopList.appendChild(btn);
    });
}
createUpgradeButtons();

// --- Fire click animations ---
function animateFire(){
    fireBtn.style.transform="scale(1.2)";
    setTimeout(()=>fireBtn.style.transform="scale(1)",100);
}
function createSpark(){
    const spark=document.createElement("div");
    spark.className="spark";
    const size=Math.random()*15+10;
    spark.style.width=size+"px";
    spark.style.height=size+"px";
    spark.style.left=Math.random()*130+"px";
    spark.style.bottom="0px";
    document.getElementById("fire-container").appendChild(spark);
    setTimeout(()=>spark.remove(),700);
}
function showFloatingNumber(amount){
    const floatNum = document.createElement("div");
    floatNum.className="floating-number";
    floatNum.textContent = "+"+formatNumber(amount);
    floatNum.style.left=Math.random()*80+"px";
    document.getElementById("fire-container").appendChild(floatNum);
    setTimeout(()=>floatNum.remove(),1000);
}

// --- Click fire ---
fireBtn.addEventListener("click", ()=>{
    score+=clickPower;
    updateDisplay();
    animateFire();
    createSpark();
    showFloatingNumber(clickPower);
});

// --- Auto-clickers ---
setInterval(()=>{
    const totalAuto = autoClickers.tier1 + autoClickers.tier2*10 + autoClickers.tier3*100;
    if(totalAuto>0){
        score+=totalAuto;
        updateDisplay();
        for(let i=0;i<Math.min(totalAuto,5);i++) createSpark();
        fireBtn.style.transform="scale(1.1)";
        setTimeout(()=>fireBtn.style.transform="scale(1)",100);
        showFloatingNumber(totalAuto);
    }
},1000);

// --- Reset ---
resetBtn.addEventListener("click", ()=>{
    if(confirm("Reset everything?")){
        score=0; clickPower=1; autoClickers={tier1:0,tier2:0,tier3:0};
        upgrades.forEach(u=>{u.level=0; u.cost = u.cost;});
        localStorage.clear();
        updateDisplay();
        createUpgradeButtons();
    }
});

// --- Update Display ---
function updateDisplay(){
    scoreDisplay.textContent=formatNumber(score);
    clickPowerDisplay.textContent=clickPower;
    localStorage.setItem("score",score);
    localStorage.setItem("clickPower",clickPower);
}
updateDisplay();

