/**
 * Batch-compress public/images for web delivery.
 * Run: npm run compress:images
 */
import sharp from "sharp";
import {
  copyFile,
  mkdir,
  readdir,
  rename,
  stat,
  unlink,
  writeFile,
} from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public", "images");
const BACKUP = path.join(ROOT, "public", "images-original");
const TMP = path.join(ROOT, "public", "images-compressed");

/** Full-bleed hero / PageHero backgrounds */
const HERO = new Set([
  "building-1.jpg",
  "building-2.jpg",
  "building-3.png",
  "city-skyline.jpg",
  "annual-meeting.jpg",
  "basketball-match.jpg",
  "team-building.jpg",
  "team-group-photo.jpg",
  "lobby-logo-wall.jpg",
  "resin-pellets-grid.png",
  "top500-celebration.jpg",
]);

/** Small cards / amenity thumbnails */
const SMALL = new Set([
  "library.jpg",
  "canteen.jpg",
  "basketball.jpg",
  "badminton.jpg",
  "office-2.jpg",
  "lobby-2.jpg",
  "international-chamber.jpg",
  "badminton-match.jpg",
]);

/** PPT exports with useless alpha — flatten to JPEG */
const FLATTEN_PNG = new Set([
  "building-3.png",
  "freight-platform.png",
  "trucks.png",
]);

function tier(name) {
  if (HERO.has(name)) return { width: 1920, jpegQ: 82, webpQ: 82 };
  if (SMALL.has(name)) return { width: 800, jpegQ: 78, webpQ: 78 };
  return { width: 1200, jpegQ: 80, webpQ: 80 };
}

async function hasAlpha(input) {
  const { channels, hasAlpha: ha } = await sharp(input).metadata();
  return ha === true || channels === 4;
}

async function compressOne(file) {
  const input = path.join(SRC, file);
  const { width, jpegQ, webpQ } = tier(file);
  const ext = path.extname(file).toLowerCase();
  const base = path.basename(file, ext);
  const isPng = ext === ".png";

  const meta = await sharp(input).metadata();
  const alpha = isPng ? await hasAlpha(input) : false;
  const flatten = FLATTEN_PNG.has(file);

  // Photo-like PNGs without transparency → JPEG (much smaller)
  const useJpeg = isPng && (!alpha || flatten);
  const outName = useJpeg ? `${base}.jpg` : file;
  const outPath = path.join(TMP, outName);

  let pipeline = sharp(input).rotate().resize({
    width,
    withoutEnlargement: true,
    fit: "inside",
  });

  if (flatten) {
    pipeline = pipeline.flatten({
      background: file === "building-3.png" ? "#020617" : "#ffffff",
    });
  }

  if (useJpeg) {
    await pipeline.jpeg({ quality: jpegQ, mozjpeg: true }).toFile(outPath);
  } else if (isPng) {
    await pipeline
      .png({ compressionLevel: 9, palette: meta.width <= 1200 })
      .toFile(outPath);
  } else {
    await pipeline.jpeg({ quality: jpegQ, mozjpeg: true }).toFile(outPath);
  }

  // Optional WebP sibling for future <picture> use
  const webpPath = path.join(TMP, `${base}.webp`);
  await sharp(input)
    .rotate()
    .resize({ width, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: webpQ })
    .toFile(webpPath);

  const before = (await stat(input)).size;
  const after = (await stat(outPath)).size;
  return {
    file,
    outName,
    converted: useJpeg,
    beforeKB: Math.round(before / 1024),
    afterKB: Math.round(after / 1024),
    width: meta.width,
    height: meta.height,
  };
}

async function main() {
  await mkdir(TMP, { recursive: true });
  await mkdir(BACKUP, { recursive: true });

  const files = (await readdir(SRC)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f),
  );

  const results = [];
  for (const file of files) {
    const backupPath = path.join(BACKUP, file);
    try {
      await stat(backupPath);
    } catch {
      await copyFile(path.join(SRC, file), backupPath);
    }
    results.push(await compressOne(file));
  }

  // Replace originals with compressed versions
  for (const r of results) {
    const srcFile = path.join(SRC, r.file);
    const outFile = path.join(TMP, r.outName);
    if (r.converted && r.file !== r.outName) {
      await unlink(srcFile).catch(() => {});
    } else {
      await unlink(srcFile);
    }
    await rename(outFile, path.join(SRC, r.outName));
  }

  // Write conversion map for images.ts updates
  const conversions = results.filter((r) => r.converted);
  const report = {
    totalBeforeKB: results.reduce((s, r) => s + r.beforeKB, 0),
    totalAfterKB: results.reduce((s, r) => s + r.afterKB, 0),
    files: results,
    conversions,
  };
  await writeFile(
    path.join(TMP, "_report.json"),
    JSON.stringify(report, null, 2),
  );

  console.log("\nCompression complete:\n");
  for (const r of results) {
    const tag = r.converted ? " (PNG→JPG)" : "";
    console.log(
      `  ${r.file.padEnd(28)} ${String(r.beforeKB).padStart(6)} KB → ${String(r.afterKB).padStart(5)} KB${tag}`,
    );
  }
  console.log(
    `\n  Total: ${report.totalBeforeKB} KB → ${report.totalAfterKB} KB (${Math.round((1 - report.totalAfterKB / report.totalBeforeKB) * 100)}% smaller)`,
  );
  if (conversions.length) {
    console.log("\n  PNG converted to JPG:");
    for (const c of conversions) {
      console.log(`    ${c.file} → ${c.outName}`);
    }
  }
  console.log(`\n  Originals backed up to: public/images-original/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
