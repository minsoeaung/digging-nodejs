#! /usr/bin/env node

import {UltimateTextToImage} from "ultimate-text-to-image";
import imageSizeOf from "image-size";

const __dirname = new URL('.', import.meta.url).pathname;
const inputPath = __dirname + '/input/pixel.png';
const outputPath = __dirname + '/output/pixel.png';

const {width, height} = imageSizeOf(inputPath);

new UltimateTextToImage(`hi 蚂蚁的企业级产品是一个庞大且复杂的体系。Ant ၏ လုပ်ငန်းအဆင့် ထုတ်ကုန်များသည် ကြီးမားပြီး ရှုပ်ထွေးသော စနစ်တစ်ခုဖြစ်သည်။ ထိုသို့သော ထုတ်ကုန်များသည် ซ้อน ผลิตภัณฑ์ดังกล่าวไม่เพียงแต่มีขนาดใหญ่และซับซ้อนในการทำงานเท่านั้น แต่ยังมีการเปลี่ยนแปลงและเกิด လုပ်ငန်းဆောင်တာတွင် ကြီးမားပြီး ရှုပ်ထွေးရုံသာမက မကြာခဏ အပြောင်းအလဲနှင့် လိုက်လျောညီထွေရှိကာ   面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
 xyz 0123456789 零一二三四五六七八九`,
    {
        width: width * 0.9,
        maxWidth: width,
        maxHeight: height,
        fontFamily: "Roboto",
        fontColor: "#40ea05",
        fontSize: 50,
        minFontSize: 10,
        lineHeight: 50,
        autoWrapLineHeightMultiplier: 1.2,
        margin: 20,
        marginBottom: 40,
        align: "center",
        valign: "middle",
    })
    .render()
    .toFile("image1.png");
