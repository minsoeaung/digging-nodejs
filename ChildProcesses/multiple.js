const childProc = require('child_process')

const MAX_CHILDREN = 100;

async function main() {
    while (true) {
        process.stdout.write(`Sending ${MAX_CHILDREN} requests...`)
        let childProcesses = []

        for (let i = 0; i < MAX_CHILDREN; i++) {
            childProcesses.push(childProc.spawn('node', ['child.js']))
        }

        let responses = childProcesses.map((child) => {
            return new Promise((resolve, reject) => {
                child.on('exit', (code) => {
                    if (code === 0) {
                        resolve(true)
                    } else {
                        reject(false);
                    }
                })
            })
        })

        responses = await Promise.all(responses);

        if (responses.filter(Boolean).length === MAX_CHILDREN) {
            console.log('SUCCESS!')
        } else {
            console.log('FAILED');
            return;
        }
    }

}


main().catch((err) => {
    console.log(err)
})
