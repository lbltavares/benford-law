const axios = require('axios').default;
const fs = require('fs');

const QUERY_URL = 'https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exintro&format=json&explaintext';

let data;

function load() {
    if (!fs.existsSync('data.json')) {
        fs.writeFileSync('data.json', JSON.stringify(
            { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "paginas": 0, "lastTitle": "", "total": 0 }
        ));
    }
    data = JSON.parse(fs.readFileSync('data.json', { encoding: 'utf-8' }));
}

function save() {
    fs.writeFileSync('data.json', JSON.stringify(data));
}

function mostrarResultados() {
    console.log('\n#' + data.paginas);
    let total = 0;
    for (let i = 0; i <= 9; i++) {
        if (data[i])
            total += data[i];
    }
    console.log(`Digito\tOcorr.\t%`);
    for (let i = 0; i <= 9; i++) {
        if (data[i]) {
            const perc = ((data[i] / total) * 100);
            console.log(`${i}: \t${data[i]} \t${perc.toFixed(2)}%`);
        }
    }
    console.log('Total: ' + total);
    console.log('');
    save();
}

async function farm() {
    while (true) {
        let resp = await axios.get(QUERY_URL);
        data.paginas++;
        let payload = resp.data;

        let pages = payload.query.pages;
        let page = pages[Object.keys(pages)[0]]
        let content = page.extract;
        let currtitle = page.title;

        let parts = content.split(' ');
        for (let i = 0; i < parts.length; i++) {
            let p = parts[i];
            p = p.replace('-', ' ')
            p = p.replace('–', ' ')
            p = p.replace(/[^\w\s]/gi, '');
            p = p.toLowerCase();
            p = p.trim();



            if (!p) continue;
            if (!isNaN(p)) {
                let frase = '';
                for (let j = i - 5; j < i + 5; j++) {
                    if (j < 0) continue;
                    if (j >= parts.length) break;
                    frase += parts[j] + ' ';
                }

                console.clear();
                console.log(`Titulo: ${currtitle}\n`);
                console.log(`Frase: ${frase}\n`);
                if (p[0] === '0')
                    p *= 1;
                let firstDigit = p[0];
                console.log('Numero: ' + p);

                data.total += 1;
                if (data[firstDigit])
                    data[firstDigit]++;
                else
                    data[firstDigit] = 1;
                mostrarResultados();
            }
        }


    }
}

load();
farm();