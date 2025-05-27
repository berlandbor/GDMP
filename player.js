
const params = new URLSearchParams(location.search);
const name = params.get("name");
const url = params.get("url");
const logo = params.get("logo");

const titleEl = document.getElementById("title");
const logoEl = document.getElementById("logo");
const iframeBox = document.getElementById("iframeBox");
const errorEl = document.getElementById("error");

titleEl.textContent = "Загрузка...";

if (logo && logo.startsWith("http")) {
  logoEl.src = logo;
  logoEl.hidden = false;
}

if (!url || !url.includes("drive.google.com/file/")) {
  showError("Некорректная ссылка. Убедитесь, что это Google Drive.");
  return;
}

const match = url.match(/\/file\/d\/([^/]+)\//);
if (!match) {
  showError("Не удалось извлечь ID файла из ссылки.");
  return;
}

const fileId = match[1];
const iframeUrl = `https://drive.google.com/file/d/${fileId}/preview`;

const iframe = document.createElement("iframe");
iframe.width = "100%";
iframe.height = "480";
iframe.src = iframeUrl;
iframe.frameBorder = "0";
iframe.allowFullscreen = true;

iframe.onload = () => {
  titleEl.textContent = name || "Фильм";
};

iframe.onerror = () => {
  showError("Не удалось загрузить видео. Проверьте доступность.");
};

iframeBox.appendChild(iframe);

function showError(msg) {
  titleEl.textContent = "Ошибка";
  errorEl.textContent = msg;
  errorEl.style.color = "#ff4444";
}