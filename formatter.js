
/**
 * formatter.js
 * Lógica para o processamento e extração de números das 
 * strings recebidas pelos farmers.
 * 
 */

exports.extractNumbers = function (textArr) {
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
};

exports.process = function (textArr) {
    return exports.extractNumbers(textArr);
};