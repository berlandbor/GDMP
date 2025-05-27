let stations = [];
const playlistGrid = document.getElementById("playlistGrid");
const fileInput = document.getElementById("fileInput");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("visible");
});

window.onload = () => {
  const saved = localStorage.getItem("media_autoload");
  if (saved) {
    try {
      stations = JSON.parse(saved);
      renderGrid();
    } catch (e) {
      console.error("Ошибка чтения базы:", e);
    }
  }
};

fileInput.addEventListener("change", handleFile);

function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    parsePlaylist(reader.result);
  };
  reader.readAsText(file);
  sidebar.classList.remove("visible");
}

function parsePlaylist(text) {
  const lines = text.split(/\r?\n/);
  const parsed = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split("|").map(p => p.trim());

    if (parts.length >= 2) {
      const name = parts[0] || "Без названия";
      const link = parts[1];
      const poster = parts[2] || "https://via.placeholder.com/140x80?text=Видео";

      parsed.push({
        name,
        url: link,
        logo: poster,
        group: "Google Drive"
      });
    }
  }

  stations = parsed;
  localStorage.setItem("media_autoload", JSON.stringify(parsed));
  renderGrid();
}

function renderGrid() {
  playlistGrid.innerHTML = "";
  stations.forEach((station, i) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.onclick = () => openPlayer(station, i);

    const img = document.createElement("img");
    img.src = station.logo;
    img.alt = station.name;

    const nameEl = document.createElement("span");
    nameEl.textContent = station.name;

    tile.appendChild(img);
    tile.appendChild(nameEl);
    playlistGrid.appendChild(tile);
  });
}

function openPlayer(station, index) {
  localStorage.setItem("last_index", index);
  const encodedName = encodeURIComponent(station.name);
  const encodedUrl = encodeURIComponent(station.url);
  const encodedLogo = encodeURIComponent(station.logo || "");
  window.open(`player.html?name=${encodedName}&url=${encodedUrl}&logo=${encodedLogo}`, "_blank");
}