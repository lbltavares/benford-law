const fs = require('fs');
const DATAFILE = 'data.json';

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

function incrementPages() {
    result.pages++;
}

function update(numbers) {
    if (!numbers.length) return;
    for (let n of numbers) {
        if (!n) continue;
        let first = n.toString()[0];
        if (!result[first]) result[first] = 1;
        else result[first]++;
        result.total++;
    }
    if (!result.total) return;
    save();
}

module.exports = { load, save, update, incrementPages, result };