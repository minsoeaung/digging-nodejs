import imageSizeOf from "image-size";
import sharp from "sharp";

const __dirname = new URL('.', import.meta.url).pathname;
const inputPath = __dirname + '/input/pixel.png';
const outputPath = __dirname + '/output/pixel.png';
const text = 'After massive 专业可靠、不限可能 \nမြန်မာအက္ခရာ ไม่เป็นไร คิดถึง project practice and summaries, Ant Design, a design language for background applications, is refined by Ant UED Team, which aims to uniform the user interface specs for internal background projects, lower the unnecessary cost of design differences and implementation and liberate the resources of design and front-end development.';

const {width, height} = imageSizeOf(inputPath);

async function addTextOnImage() {
    try {
        const svgImage = `
            <svg width="${width}" height="${height}">
                <style>
                    .title { fill: #001; font-size: 70px;}
                </style>
                <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
            </svg>
        `;
        const svgBuffer = Buffer.from(svgImage);
        const image = await sharp(inputPath)
            .composite([
                {
                    input: svgBuffer,
                    top: 0,
                    left: 0,
                },
            ])
            .toFile(outputPath);
        console.log('Done')
    } catch (error) {
        console.log(error);
    }
}

await addTextOnImage();
