const { worker } = require("./mocks/browser");
worker.start();

document.querySelector("button").addEventListener("click", async function () {
  const res = await fetch("/image.bmp");
  const arrayBuffer = await res.arrayBuffer();

  const blob = new Blob([arrayBuffer], { type: "image/bmp" });

  const formData = new FormData();
  formData.append("file", blob, "file.bmp");

  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const img = new Image();
  img.src = "/api/image.bmp";
  document.getElementById("result").append(img);
});
