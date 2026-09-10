import sharp from 'sharp';
import fs from 'node:fs/promises';
const report = {};
for (const name of ['dancer', 'robot-arm']) {
  const input = `public/assets/hero/${name}.png`;
  const meta = await sharp(input).metadata();
  report[name] = { source: { width: meta.width, height: meta.height, bytes: (await fs.stat(input)).size }, variants: [] };
  for (const edge of [480, 640, 960, Math.max(meta.width, meta.height)]) {
    const output = `public/assets/hero/${name}-${edge}.webp`;
    const info = await sharp(input).resize({ width: edge, height: edge, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 100, effort: 6 }).toFile(output);
    report[name].variants.push({ file: output, width: info.width, height: info.height, bytes: info.size });
  }
}
for (const name of ['photo.jpg', 'vl_pipeline.png', 'mri_recovered.jpeg']) {
  await sharp(`public/assets/${name}`).resize({width:name==='photo.jpg'?640:name==='mri_recovered.jpeg'?400:1000, withoutEnlargement:true}).webp({quality:82}).toFile(`public/assets/${name.split('.')[0]}-preview.webp`);
}
await fs.writeFile('docs/asset-sizes.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report,null,2));

await sharp('public/assets/upenn_logo.png').resize({width:160}).webp({quality:82}).toFile('public/assets/upenn-logo-preview.webp');
