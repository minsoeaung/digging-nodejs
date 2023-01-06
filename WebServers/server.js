const http = require('http')
const fs = require("fs");
const {createGzip} = require('zlib');
const {pipeline} = require('stream');
import http from ''

const gzip = createGzip();

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Encoding': 'gzip'
    })
    const source = fs.createReadStream('./pic.jpg');
    pipeline(source, gzip, res, (source) => {
        if (source) {
            console.error('An error occurred:', source);
        }
    })
})

server.listen(3000, 'localhost', () => {
    console.log('SERVER OK')
})
