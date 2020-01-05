const RouteManager = require('./route-manager');
var Util = require('util');
const SymbolController = require('../lib/controllers/symbol');
let routes = [];

function V1Router() {
    RouteManager.call(this);    
    this.prepareRoutes();
}

Util.inherits(V1Router, RouteManager);


V1Router.prototype.prepareRoutes = function() {
  // if matches paths like /symbol/aapl
  this.get('/symbol/[0-9a-z]+', SymbolController.beforeRead, SymbolController.readResources, SymbolController.afterRead);

  // matches any other path
  this.use('.*', (req, res, next) => {
    res.statusCode = 404
    res.json({
      message: 'Invalid Path'
    });
    next();
  });
};

module.exports = function(req, res) {
  const instance = new V1Router();
  instance.router(req, res);
};
