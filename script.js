const playlistInput = document.getElementById("playlistFile");
const playlistContainer = document.getElementById("playlist");

playlistInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    try {
      const items = JSON.parse(reader.result);
      renderPlaylist(items);
    } catch {
      alert("Ошибка чтения плейлиста (ожидается JSON).");
    }
  };
  reader.readAsText(file);
});

function renderPlaylist(items) {
  playlistContainer.innerHTML = "";
  items.forEach(item => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.innerHTML = `
      <img src="https://drive.google.com/thumbnail?id=${item.id}" />
      <div class="tile-title">${item.title}</div>
    `;
    tile.addEventListener("click", () => {
      window.open(`player.html?id=${item.id}`, "_blank");
    });
    playlistContainer.appendChild(tile);
  });
}