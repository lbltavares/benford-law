const axios = require('axios').default;

const URL_REDDIT = 'http://www.reddit.com/r/random.json';


/**
 * farmers.js
 * Lógica para obter dados textuais de fontes externas.
 * 1 - Cada método deve retornar um array de strings
 * 2 - Cada método deve ter um parametro de callback 'incrementPages', e
 *     chamá-lo quando a página for carregada corretamente, para atualizar
 *     os resultados.
 * 
 */

async function reddit(incrementPages) {
    let batch = [];
    try {
        const payload = (await axios.get(URL_REDDIT)).data;
        const posts = payload.data.children;
        incrementPages();
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

module.exports = { reddit };