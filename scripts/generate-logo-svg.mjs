import sharp from "sharp";
import fs from "fs";
import path from "path";

const src = path.join("public", "tianhui_logo.jpg");
const meta = await sharp(src).metadata();
const w = meta.width;
const h = meta.height;

// 页头用：轻量 SVG，引用同目录 JPG（避免超大 base64 导致 <img> 不显示）
const logoSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${w} ${h}" role="img" aria-label="TIANHUI Group">
  <image width="${w}" height="${h}" xlink:href="/tianhui_logo.jpg" href="/tianhui_logo.jpg"/>
</svg>`;
fs.writeFileSync(path.join("public", "tianhui-logo.svg"), logoSvg);

const emblemH = Math.round(h * 0.42);
const emblemBuf = await sharp(src)
  .extract({ left: 0, top: 0, width: w, height: emblemH })
  .png()
  .toBuffer();
const b64Emblem = emblemBuf.toString("base64");
const favSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${emblemH}" role="img" aria-label="TIANHUI">
  <image width="${w}" height="${emblemH}" href="data:image/png;base64,${b64Emblem}"/>
</svg>`;
fs.writeFileSync(path.join("public", "favicon.svg"), favSvg);

console.log(`Generated tianhui-logo.svg (${w}x${h}, external JPG) and favicon.svg`);
