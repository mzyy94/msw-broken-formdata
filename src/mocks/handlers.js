// src/mocks/handlers.js
import { rest } from "msw";

const readFileAsArrayBuffer = async (file) =>
  new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result);
    fr.onerror = () => reject(fr.error);
    fr.readAsArrayBuffer(file);
  });

let file;

export const handlers = [
  rest.post("/api/upload", async (req, res, ctx) => {
    if (!req.body.file) {
      return res(ctx.status(400), ctx.json({ status: "error" }));
    }
    file = req.body.file;

    return res(ctx.status(200), ctx.text("OK"));
  }),
  rest.get("/api/image.bmp", async (_, res, ctx) => {
    const buffer = await readFileAsArrayBuffer(file);

    return res(
      ctx.status(200),
      ctx.set("Content-Length", buffer.byteLength.toString()),
      ctx.set("Content-Type", "image/bmp"),
      ctx.body(buffer)
    );
  }),
];
