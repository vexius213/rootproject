let cookies = 0;
let clickPower = 1;
let cps = 0;
let upgradesBought = {
  clickDouble: 0,
  grandma: 0
};

const UPGRADES = {
  clickDouble: { basePrice: 100,   currentPrice: 100,   multiplier: 2   },
  grandma:     { basePrice: 400,   currentPrice: 400,   cps: 1          }
};

const DOM = {
  cookies: document.getElementById("cookies"),
  items:   document.querySelectorAll(".item")
};

function loadGame() {
  const save = localStorage.getItem("cookieClickerSave");
  if (!save) return;

  const data = JSON.parse(save);
  cookies          = data.cookies         || 0;
  clickPower       = data.clickPower      || 1;
  cps              = data.cps             || 0;
  upgradesBought   = data.upgradesBought  || { clickDouble: 0, grandma: 0 };

  // Recalculate prices
  UPGRADES.clickDouble.currentPrice = UPGRADES.clickDouble.basePrice * (1.6 ** upgradesBought.clickDouble);
  UPGRADES.grandma.currentPrice     = UPGRADES.grandma.basePrice     * (1.6 ** upgradesBought.grandma);
}

function saveGame() {
  const data = { cookies, clickPower, cps, upgradesBought };
  localStorage.setItem("cookieClickerSave", JSON.stringify(data));
}

function updateDisplay() {
  DOM.cookies.textContent = Math.floor(cookies);

  DOM.items.forEach(item => {
    const type = item.dataset.upgrade;
    const priceEl = item.querySelector(".price");
    priceEl.textContent = Math.floor(UPGRADES[type].currentPrice);

    const affordable = cookies >= UPGRADES[type].currentPrice;
    item.querySelector("button").disabled = !affordable;
    item.classList.toggle("affordable", affordable);
  });
}

function buyUpgrade(type) {
  const upgrade = UPGRADES[type];
  if (cookies < upgrade.currentPrice) return;

  cookies -= upgrade.currentPrice;
  upgradesBought[type]++;

  if (type === "clickDouble") {
    clickPower *= upgrade.multiplier;
  } else if (type === "grandma") {
    cps += upgrade.cps;
  }

  // Price increase
  upgrade.currentPrice = Math.floor(upgrade.basePrice * (1.6 ** upgradesBought[type]));

  saveGame();
  updateDisplay();
}

// Init
loadGame();
updateDisplay();

// Events
DOM.items.forEach(item => {
  item.querySelector("button").addEventListener("click", () => {
    buyUpgrade(item.dataset.upgrade);
  });
});

// Live update (in case someone leaves tab open)
setInterval(() => {
  cookies += cps / 10;
  updateDisplay();
  saveGame();
}, 100);