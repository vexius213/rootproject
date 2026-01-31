const MAX_SCORES = 10;

function getLeaderboard() {
  const data = localStorage.getItem("cookieClickerLeaderboard");
  return data ? JSON.parse(data) : [];
}

function saveLeaderboard(scores) {
  localStorage.setItem("cookieClickerLeaderboard", JSON.stringify(scores));
}

function submitScore() {
  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();
  if (!name) return alert("Please enter a name");

  const save = localStorage.getItem("cookieClickerSave");
  if (!save) return alert("No save found – click some cookies first!");

  const { cookies } = JSON.parse(save);
  if (cookies < 100) return alert("You need at least 100 cookies to appear on leaderboard");

  let scores = getLeaderboard();

  // Remove old entry from same name (optional – you can remove this)
  scores = scores.filter(s => s.name !== name);

  scores.push({ name, cookies: Math.floor(cookies) });
  scores.sort((a, b) => b.cookies - a.cookies);
  scores = scores.slice(0, MAX_SCORES);

  saveLeaderboard(scores);
  nameInput.value = "";
  renderLeaderboard();
  alert("Score submitted!");
}

function renderLeaderboard() {
  const tbody = document.getElementById("leaderboardBody");
  tbody.innerHTML = "";

  const scores = getLeaderboard();

  scores.forEach((entry, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i+1}</td>
      <td>${entry.name}</td>
      <td>${entry.cookies.toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });

  if (scores.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3">No scores yet – be the first!</td></tr>';
  }
}

// Init
renderLeaderboard();
document.getElementById("submitScore").addEventListener("click", submitScore);