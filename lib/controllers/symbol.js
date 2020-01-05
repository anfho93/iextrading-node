const iex = require('../iex-client');
const HTTPError = require('../http-error');

/**
 * Constructor function of the Symbol Controller
 */
function SymbolController() {
}

/**
 * Reads the quote, logo and latest news from a given stock 
 * symbol trough data from iexcloud api
 */
SymbolController.prototype.readResources = async (req, res, next) => {
    if (!req.params.symbol) {
        return next(new HTTPError(400, 'The symbol parameter is required'));
    }
    try {
        const data = await getSymbolData(req.params.symbol);
        let [quota, logo, news] = data;
        // gets the latest news
        if (Array.isArray(news)) {
            news.sort((a, b) => a.datetime >= b.datetime ? 1 : -1);
            news = news.length > 0 ? news[0].url : 'No recent news 😅';
        }

        res.statusCode = 200;
        const d = {
            latestPrice: quota.latestPrice || 'No recent price 😅',
            companyLogo: logo.url || 'No company logo 😅',
            latestNews: news
        };

        res.json({data: d});        
    } catch (e) {
        return next(new HTTPError(400,  e.data));
    }
    next();
}
/**
 * TODO We can move this function later to make it generic,
 * currently it parses the parameter from the URL for this endpoint only
 */
SymbolController.prototype.beforeRead = (req, res, next) => {
    req.params = req.pathname.split('/');
    if (Array.isArray(req.params) & req.params.length >= 2) {       
        req.params = {
            symbol: req.params.slice(1)[1]
        }
    }
    next();
}

/**
 * Request last quoteData, companyLogo and latest news from a given stock company
 * @param {String} symbol stock company symbol
 */
let getSymbolData = (symbol) => {
    const quoteData = iex.quote(symbol);
    const companyLogoUrl = iex.logoURL(symbol);
    const news = iex.news(symbol);
    return Promise.all([quoteData, companyLogoUrl, news]);
};


var instance = new SymbolController();
module.exports = instance;