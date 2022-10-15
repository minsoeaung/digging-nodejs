const fs = require('fs');

function processFile(filePath) {
    console.log('SYNC VERSION')
    const contents = fs.readFileSync(filePath, 'utf-8');
    // this output the Buffer
    // console.log do more than just putting \n at the end
    console.log('console log', contents);
    // this output the STRING
    process.stdout.write(contents);

    // async version
    console.log('ASYNC VERSION')
    fs.readFile(filePath, (err, data) => {
        if (err) console.log(err)

        console.log('inside fs.readFile', data)
    })
}

function streamFile(filePath) {
    const stream = fs.createReadStream(filePath);
    stream.on('data', (data) => {
        console.log(data);
    })
    stream.on('close', () => {
        console.log('STREAM COMPLETE');
    })
}

processFile('./hello.txt')

// streamFile('./hello.txt');
