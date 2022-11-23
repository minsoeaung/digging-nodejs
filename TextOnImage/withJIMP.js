import stuff from './inout.js';
import Jimp from "jimp";
import imageSizeOf from "image-size";

const {input, output, text} = stuff;
const {width, height} = imageSizeOf(input);
const x = 10, y = 10, maxWidth = width, maxHeight = height

const image = await Jimp.read(input);
const font = await Jimp.loadFont('Roboto-Regular.ttf');
image.print(
    font,
    x,
    y,
    text,
    maxWidth,
    (err, image, {x, y}) => {
        image.print(font, x, y + 20, 'More text on another line', 50);
    }
);
await image.writeAsync(output);
console.log('Done');
