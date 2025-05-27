const params = new URLSearchParams(location.search);
const name = params.get("name");
const url = params.get("url");
const logo = params.get("logo");
const index = parseInt(params.get("index"));
const playlist = JSON.parse(localStorage.getItem("media_autoload") || "[]");

const titleEl = document.getElementById("title");
const logoEl = document.getElementById("logo");
const spinner = document.getElementById("spinner");
const errorEl = document.getElementById("error");
const playerBox = document.getElementById("player");
const alertSound = document.getElementById("alertSound");

titleEl.textContent = name || "Файл Google Drive";
if (logo && logo.startsWith("http")) {
  logoEl.src = logo;
  logoEl.hidden = false;
}

const audioFormats = /\.(mp3|aac|ogg|m4a)$/i;
const isVideo = !audioFormats.test(url);
const player = document.createElement(isVideo ? "video" : "audio");
player.controls = true;
player.autoplay = true;
playerBox.appendChild(player);
player.src = url;

player.addEventListener("waiting", () => showSpinner("Буферизация..."));
player.addEventListener("canplay", hideSpinner);
player.addEventListener("playing", hideSpinner);
player.addEventListener("canplaythrough", hideSpinner);
player.addEventListener("error", () => {
  hideSpinner();
  errorEl.innerHTML = `
    Не удалось воспроизвести файл.<br>
    Убедитесь, что файл общедоступен на Google Диске.<br>
    Возможно, превышен лимит скачиваний.
  `;
  errorEl.style.color = "#ff4444";
  alertSound.play().catch(() => {});
});

function showSpinner(msg) {
  spinner.hidden = false;
}

function hideSpinner() {
  spinner.hidden = true;
}