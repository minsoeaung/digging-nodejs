const childProc = require('child_process')

async function main() {
    console.log('Child start')
    const child = childProc.spawn('node', ['child.js']);
    const fasterChild = childProc.spawn('node', ['fasterChild.js']);
    child.on('exit', (code) => {
        console.log('Child finish', code);
    })
    fasterChild.on('exit', (code) => {
        console.log('Faster Child finish', code);
    })
}

main().catch((reason) => {
    console.log(reason)
})
