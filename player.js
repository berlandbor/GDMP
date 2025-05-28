const videoFrame = document.getElementById("videoFrame");

const params = new URLSearchParams(window.location.search);
const fileId = params.get("id");

if (fileId) {
  const src = `https://drive.google.com/file/d/${fileId}/preview`;
  videoFrame.src = src;
} else {
  videoFrame.outerHTML = "<p>❌ Видео не выбрано. Вернитесь к плейлисту.</p>";
}