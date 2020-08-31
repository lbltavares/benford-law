const farmers = require('./farmers');
const { process } = require('./formatter');
const { result, update, incrementPages } = require('./persist');

function display() {
    let pad = 10;
    console.clear();
    console.log(`Pages: ${result.pages}`);
    console.log('%s\t%s\t%s',
        'Digit'.padStart(pad),
        'Occur'.padStart(pad),
        '%'.padStart(pad)
    );
    for (let i = 1; i <= 9; i++) {
        if (!result[i]) continue;
        let digit = i;
        let occ = result[i];
        let perc = (occ / result.total) * 100;
        console.log('%s\t%s\t%s',
            digit.toString().padStart(pad),
            occ.toString().padStart(pad),
            perc.toFixed(2).toString().padStart(pad)
        );
    }
    console.log(`Total: \t${result.total}`);
}

(async function main() {
    let running = true;
    while (running) {
        display(update(process([
            ...await farmers.redditRandomPost(incrementPages),

        ])));
    }
})();
