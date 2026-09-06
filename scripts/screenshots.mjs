import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/screenshots', { recursive: true });
for (const file of ['01-garage','02-car-overview','03-factory-spec','04-timeline','06-parking-lot']) {
 for (const width of [400,800]) await sharp(`app-screenshots/${file}.png`).resize({width}).webp({quality:92,effort:6}).toFile(`public/screenshots/${file}-${width}.webp`);
}
