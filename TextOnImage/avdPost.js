import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const __dirname = new URL('.', import.meta.url).pathname;

let imgNum = 1;

for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 3; j++) {
        try {
            const form = new FormData();
            form.append('user_id', 11);
            form.append('start_date', '2022-12-11 16:30:00');
            form.append('end_date', '2022-12-18 16:29:59');
            form.append('row', i);
            form.append('column', j);
            form.append('ads_code', 'A1');
            form.append('adv_current_country', 'mm');
            form.append('destination_country', '');
            form.append('adv_region', '');
            form.append('bc_code', 100);
            form.append('bsc_sub_code', '');
            form.append('image', fs.createReadStream(path.join(__dirname, `/thumbs/${imgNum}.png`)));
            await fetch('https://api.uat.nhtpgroup.com/v1/advertisements', {
                method: 'POST',
                headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9uYW1lIjoiU3VwZXIgQWRtaW4iLCJhdXRob3JpemVkIjp0cnVlLCJleHAiOiIyMDIzLTA2LTA5VDEwOjA3OjI2LjE0NjczNzAyWiJ9.XbpAA1Ph44uj2jc4AMuecH567e_yHVWETcEViWcYi9I'},
                body: form
            })
            console.log(`Row ${i} Col ${j} Done`)
        } catch (e) {
            console.log('ERROR', e)
        }
        imgNum++;
    }
}
