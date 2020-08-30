
/**
 * formatter.js
 * Lógica para o processamento e extração de números das 
 * strings recebidas pelos farmers.
 * 
 */

exports.extractNumbers = function (textArr) {
    let numbers = [];
    for (let txt of textArr) {
        try {
            if (!txt) continue;
            txt = txt.toString();
            let nums = txt
                .replace(/(\r\n|\n|\r)/gm, '') // Remove quebra de linhas
                .match(/\d+\.?\,?(\d+)?/g).map(Number); // Filtra apenas os numeros
            if (nums && nums.length) numbers.push(...nums);
        } catch (ex) {
            // console.error(ex);
        }
    }
    return numbers;
};

exports.process = function (textArr) {
    textArr.filter(str => str); // Remove entradas em branco
    return exports.extractNumbers(textArr);
};