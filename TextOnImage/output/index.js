import imageSizeOf from 'image-size';
import {createCanvas, loadImage} from "canvas";
import fs from "fs";

const __dirname = new URL('.', import.meta.url).pathname;
const inputPath = __dirname + '/input/pixel.png';
const outputPath = __dirname + '/output/pixel.png';
const text = 'After massive \n 专业可靠、不限可能 \n မြန်မာအက္ခရာ \nไม่เป็นไร คิดถึง \nproject practice and summaries';

const {width, height} = imageSizeOf(inputPath);
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

const FONT_SIZE = '60px';
const FONT_FAMILY = 'Roboto'

// Draw image
const image = await loadImage(inputPath);
ctx.drawImage(image, 0, 0);

// Draw text
ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;
ctx.fillText(text, 50, 50);

// Stream the result
const pngStream = canvas.createPNGStream();
const writeStream = fs.createWriteStream(outputPath);
pngStream.pipe(writeStream);
