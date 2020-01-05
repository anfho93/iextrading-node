

// This should not be hardcode, this is only for testing purposes.
const TOKEN = process.env.IEXCLOUD_PUBLIC_KEY || 'pk_0d8ad43af7b14b7c953db78447f5117b';
const BASE_URL = process.env.IEXCLOUD_API_URL || 'https://cloud.iexapis.com/stable';

const https = require('https');
/**
 * Gets the quote data from a given stock
 * @param {String} symbol form the stock
 */
const quote = (symbol) => {
    return get(`/stock/${symbol}/quote`);
}
/**
 * Gets the logo image from a given company stock symbol
 * @param {String} symbol 
 */
const logoURL = (symbol) => {
    return get(`/stock/${symbol}/logo`);
}
/**
 * Gets the latest news from a given company stock symbol
 * @param {String} symbol 
 */
const news = (symbol) => {
    return get(`/stock/${symbol}/news`);
};

/**
 *  Function to make get requests to the iexcloud.io API
 * @param {String} url with the endpoint from the api
 */
const get = (url) => {
    return new Promise((resolve, reject) => {
        https.get(`${BASE_URL}${url}?token=${TOKEN}`, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                try {
                    data = JSON.parse(data);
                    resolve(data);
                } catch (e) {
                    reject({ data });
                }
            });

        }).on("error", (err) => {
            reject(JSON.parse({ error: err }));
        });
    });
}

module.exports = { quote, news, logoURL };