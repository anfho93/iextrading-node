const HTTPError = require('../lib/http-error');
const logger = require('../lib/logger');

function RouteManager() {
    this.routes = [];
    this.prefix = '';
}

RouteManager.prototype._use = function (method, url, ...callbacks) {
    this.routes.push({
        prefix: url, url: RegExp(url, 'i'), callbacks: callbacks, method: method
    });
}

RouteManager.prototype.use = function (url, ...callbacks) {
    this._use('any', url, ...callbacks);
}

RouteManager.prototype.post = function (url, ...callbacks) {
    this._use('post', url, ...callbacks);
}

RouteManager.prototype.get = function (url, ...callbacks) {
    this._use('get', url, ...callbacks);
}

RouteManager.prototype.delete = function (url, ...callbacks) {
    this._use('delete', url, ...callbacks);
}

RouteManager.prototype.put = function (url, ...callbacks) {
    this._use('put', url, ...callbacks);
}

RouteManager.prototype.checkRoute = function (req, res) {
    const { href, search, query, pathname } = require('url').parse(req.url);
    req.href = href;
    req.search = search;
    req.query = query;
    req.pathname = pathname;

    for (let route of this.routes) {
        if (route.url.test(pathname) && (route.method === 'any' || req.method.toLowerCase() === route.method)) {
            var iterator = route.callbacks[Symbol.iterator](); // gets an iterator from the callback array

            function initCallback(req, res, callback) {
                if (!callback) {
                    res.end();
                    logger(req, res);
                    return;
                }
                // simulate the req, res, next from express using recursion
                callback(req, res, (response) => {
                    if (response instanceof HTTPError) {
                        res.statusCode = response.status;
                        res.json(response.toJSON());
                        initCallback(req, res, undefined);
                    } else  
                        initCallback(req, res, iterator.next().value);                
                });
            }
            initCallback(req, res, iterator.next().value);
            
            return;
            
        }

    }

}

/**
 * Router for http server
 * @param {ServerResponse} res 
 */
RouteManager.prototype.setDefaultResponse = function (res) {
    res.statusCode = 404;
    res.statusMessage = 'Not found';
    res.setTimeout = 30000;
    res.setHeader('Content-Type', 'application/json');
    res.json = function (jsonObject) {
        try {
            jsonObject = JSON.stringify(jsonObject);
        } catch (e) {
            return;
        }
        res.write(jsonObject);
        return res;
    };
    res.status = function (statusCode) {
        // need to be validated
        res.statusCode = statusCode;
        return res;
    };
};

RouteManager.prototype.router = function (req, res) {
    this.setDefaultResponse(res);
    this.checkRoute(req, res);
}

module.exports = RouteManager;