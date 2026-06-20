import sharp from 'sharp';
import fs from 'fs';
const src = process.argv[2];
const out = process.argv[3];
const tmp = out + '.tmp';
await sharp(src)
  .resize({ width: 1200, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(tmp);
fs.renameSync(tmp, out);
if (src !== out) fs.unlinkSync(src);
