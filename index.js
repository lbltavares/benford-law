const axios = require('axios').default;
const fs = require('fs');

const DATAFILE = 'data.json';
const URL_REDDIT = 'http://www.reddit.com/r/random.json';

function load(file = DATAFILE) {
    if (fs.existsSync(file))
        return JSON.parse(fs.readFileSync(file, { encoding: 'utf-8' }));
    return {
        pages: 0,
        total: 0,
    };
}
let result = load();

function save(file = DATAFILE, data = result) {
    fs.writeFileSync(file, JSON.stringify(data), { encoding: 'utf-8' });
}

async function reddit() {
    let batch = [];
    try {
        const payload = (await axios.get(URL_REDDIT)).data;
        const posts = payload.data.children;
        result.pages++;
        for (let { data } of posts) {
            // console.log(data.title);
            // batch.push(data.title);

            // console.log(data.selftext);
            // batch.push(data.selftext);

            // console.log(data.num_comments);
            batch.push(data.num_comments);
        }
    } catch (ex) {
        console.error(ex);
    }
    return batch;
}

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

function display(numbers) {
    if (!numbers || !numbers.length) return;
    for (let n of numbers) {
        if (!n) continue;
        let first = n.toString()[0];
        if (!result[first]) result[first] = 1;
        else result[first]++;
        result.total++;
    }
    if (!result.total) return;
    save();
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
        display(extractNumbers([...await reddit()]));
    }
})();