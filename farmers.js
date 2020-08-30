const axios = require('axios').default;


/**
 * farmers.js
 * Lógica para obter dados textuais de fontes externas.
 * 1 - Cada método deve retornar um array de strings (no formato puro, sem formatação);
 * 2 - Cada método deve ter um parametro de callback 'incrementPages', e
 *     chamá-lo quando a página for carregada corretamente, para atualizar
 *     os resultados;
 * 
 */

exports.redditRandomPost = async function (incrementPages) {
    const URL = 'http://www.reddit.com/r/random.json';
    let batch = [];
    try {
        const payload = (await axios.get(URL)).data;
        const posts = payload.data.children;
        incrementPages();
        for (let { data } of posts) {
            // console.log(data.title);
            batch.push(data.title);

            // console.log(data.selftext);
            batch.push(data.selftext);

            // console.log(data.num_comments);
            batch.push(data.num_comments);
        }
    } catch (ex) {
        console.error(ex);
    }
    return batch;
};