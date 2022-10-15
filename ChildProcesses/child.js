async function main() {
    let x = 0;
    for (let i = 0; i < 1000000000; i++) {
        x = x + i;
    }
    // for convention, 0 means everything fine
    // others mean something wrong
    process.exitCode = 0
}

main().catch(() => 1)
