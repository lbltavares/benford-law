const farmers = require('./farmers');
const { result, update, incrementPages } = require('./persist');

function extractNumbers(textArr) {
    let batch = [];
    for (let txt of textArr) {
        if (!txt) continue;
        txt = 1 * txt;
        txt = txt.toString();
        let num = txt
            .replace(/(\r\n|\n|\r)/gm, '');
        if (txt) batch.push(num);
    }
    return batch;
}

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
        // console.log(`${digit}\t${occ}\t${perc.toFixed(2)}`);
    }
    console.log(`Total: \t${result.total}`);
    return;
}



(async function main() {
    while (true) {
        display(update(extractNumbers([
            ...await farmers.reddit(incrementPages),

        ])));
    }
})();