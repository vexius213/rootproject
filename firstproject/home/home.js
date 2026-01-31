let cookies = 0;
let clickPower = 1;
let cps = 0;           // cookies per second
let upgradesBought = {
  clickDouble: 0,
  grandma: 0
};

const DOM = {
  cookies:     document.getElementById("cookies"),
  clickPower:  document.getElementById("clickPower"),
  cps:         document.getElementById("cps"),
  cookie:      document.getElementById("cookie")
};

function loadGame() {
  const save = localStorage.getItem("cookieClickerSave");
  if (!save) return;

  const data = JSON.parse(save);
  cookies          = data.cookies         || 0;
  clickPower       = data.clickPower      || 1;
  cps              = data.cps             || 0;
  upgradesBought   = data.upgradesBought  || { clickDouble: 0, grandma: 0 };
}

function saveGame() {
  const data = {
    cookies,
    clickPower,
    cps,
    upgradesBought
  };
  localStorage.setItem("cookieClickerSave", JSON.stringify(data));
}

function updateDisplay() {
  DOM.cookies.textContent    = Math.floor(cookies);
  DOM.clickPower.textContent = clickPower;
  DOM.cps.textContent        = cps.toFixed(1);
}

function clickCookie() {
  cookies += clickPower;
  updateDisplay();
  saveGame();
}

// Very basic CPS loop
setInterval(() => {
  cookies += cps / 10;   // 10 ticks per second
  updateDisplay();
  saveGame();
}, 100);

DOM.cookie.addEventListener("click", clickCookie);
DOM.cookie.addEventListener("mousedown", () => {
  DOM.cookie.style.transform = "scale(0.92)";
});
DOM.cookie.addEventListener("mouseup", () => {
  DOM.cookie.style.transform = "scale(1)";
});

// Load game and set initial values
loadGame();
updateDisplay();

// Also update once per second in case of rounding issues
setInterval(updateDisplay, 1000);