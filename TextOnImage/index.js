#! /usr/bin/env node

import imageSizeOf from "image-size";
import axios from "axios";
import ffmpeg from 'fluent-ffmpeg';
import {createReadStream} from "fs";
import FormData from 'form-data';
import path from "path";
import http from "http";

const __dirname = new URL('.', import.meta.url).pathname;
const inputPath = __dirname + '/input/pixel.png';
const outputPath = __dirname + '/output/pixel.png';

const {width, height} = imageSizeOf(inputPath);
const url = 'https://api.uat.nhtpgroup.com/v1/mobile/videos';

http.createServer((req, res) => {
    console.log(res.status)
    // res.send({
    //     message: 'lol'
    // })
    console.log(req.url)
    // res.sendFile(createReadStream(path.join(__dirname, `/video1to50/input.mp4`)))
}).listen(3000, () => {
    console.log('listening')
})

for (let i = 1; i <= 50; i++) {
    break;
    var proc = ffmpeg('./input.mp4')
        .videoFilters({
            filter: 'drawtext',
            options: {
                text: String(i),
                fontsize: 60,
                fontcolor: 'black',
                x: '(main_w/2-text_w/2)',
                y: 30,
                shadowcolor: 'black',
                shadowx: 2,
                shadowy: 2
            }
        })
        .inputOption('-stream_loop 30')
        .on('end', function () {
            console.log(i, 'file has been converted succesfully');
        })
        .on('error', function (err) {
            console.log('an error happened: ' + err.message);
        })
        // save to file
        .save(`./video1to50/${i}.mp4`);
}


(async () => {
    for (let i = 1; i <= 50; i++) {
        break;
        try {
            // const ff = await ffmpeg(`./video1to50/${i}.mp4`)
            //     .takeScreenshots({
            //         timestamps: [0],
            //         filename: `${i}.png`,
            //         folder: './thumbs',
            //         size: '450x320'
            //     });
            // continue;
            // const textToImage = new UltimateTextToImage(String(i),
            //     {
            //         width: 300,
            //         height: 300,
            //         fontFamily: "Roboto",
            //         fontColor: "#064a00",
            //         fontSize: 50,
            //         minFontSize: 10,
            //         lineHeight: 50,
            //         autoWrapLineHeightMultiplier: 1.2,
            //         borderColor: 0xFF000099,
            //         borderSize: 2,
            //         backgroundColor: "#f2fcf1",
            //         margin: 20,
            //         marginBottom: 40,
            //         align: "center",
            //         valign: "middle",
            //     })
            //     .render();
            // const streamPng = textToImage.toStream();
            if (i === 2) break;
            const form = new FormData();
            form.append("video", createReadStream(path.join(__dirname, `/video1to50/input.mp4`)));
            form.append("thumbnail", createReadStream(path.join(__dirname, `/thumbs/image_00001.png`)));
            form.append("description", i);
            form.append("category", 'sky-video'); // 3vid or sky or video
            form.append('device_type', 'Web');
            const {data} = await axios(url, {
                method: 'POST',
                body: form,
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJCY0NvZGUiOiIzIiwiQ2hhdE5vdGkiOmZhbHNlLCJDaGF0UGFzc3dvcmQiOiIwMng2aXluNCIsIkNoYXRVc2VyTmFtZSI6Im5odHAwMng2aXluNDE2NzAzODYxMjIyODkyMjY0NjFAY2hhdC5uaHRwZ3JvdXAuY29tIiwiQ291bnRyeUNvZGUiOiIiLCJDckNvZGUiOiIiLCJDdXJyZW50Q291bnRyeSI6Im1tIiwiTmh0cENvZGUiOiIzLTk5OTk5LTk5OTk5LTUiLCJQcm9maWxlSW1hZ2UiOiIiLCJSZWdpc3RlckNvdW50cnkiOiJNTSIsIlNlY3JldFVzZXJJZCI6MCwiU2hhcmVkUGxhblVzZXJJZCI6IiIsIlN1c3BlbmQiOmZhbHNlLCJUb2tlbkV4cGlyYXRpb25UaW1lIjoiMjAyMy0wNi0wN1QwNToxNTo0My4xNjUyMzI1NzZaIiwiVXNlckNvZGUiOiI5OTk5OTk5OTk5NSIsIlVzZXJJZCI6NiwiVXNlck5hbWUiOiJNaW4gU29lIEF1bmciLCJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6Im1pbnNvZWF1bmcyMDAxQGdtYWlsLmNvbSIsImV4cCI6IjIwMjMtMDYtMDdUMDU6MTU6NDMuMTY1MjM3NDY2WiIsIm5hbWUiOiJNaW4gU29lIEF1bmciLCJwaG9uZV9udW0iOiIiLCJ1c2VyX2lkIjo2fQ.lOrcN8Mys8srQHXeynOxjwrZOTkGUPIwF74uC77W1rc'
                }
            })
            console.log(`${i} done`);
        } catch (e) {
            console.log('ERROR', e);
        }
    }
})();
