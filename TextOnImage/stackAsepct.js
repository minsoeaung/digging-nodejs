import {getCanvasImage, UltimateTextToImage} from "ultimate-text-to-image";
import {createWriteStream} from "fs";
import path from "path";

const __dirname = new URL('.', import.meta.url).pathname;

const canvasImage1 = await getCanvasImage({url: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/100.png'});

const textToImage = new UltimateTextToImage('',
    {
        width: 600,
        height: 300,
        backgroundColor: "#374047",
        images: [
            {canvasImage: canvasImage1, layer: 1, repeat: "fit", x: 150, y: 0, width: 300, height: 300}
        ]
    })
    .render()
const streamPng = textToImage.toStream();
streamPng.pipe(createWriteStream(path.join(__dirname, '/hi.png')))
