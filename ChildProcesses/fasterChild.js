async function main() {
    let x = 0;
    for (let i = 0; i < 100; i++) {
        x = x + i;
    }
    process.exitCode = 0
}

main().catch(() => 1)
