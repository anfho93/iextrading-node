var util = require('util');
/**
 *  Represents a HTTP Error to be logged and showed to the user in the json response
 * @param {number} httpStatusCode 
 * @param {String} message 
 */
function HTTPError(httpStatusCode, message) {
    Error.captureStackTrace(this, this.constructor);

    this.name = name || 'HTTP Error';
    this.message = message || 'HTTP Error';
    this.status = httpStatusCode;

    this.errors = [];

    if (this.stack)
        this.stack = this.stack.split('\n');
}

util.inherits(HTTPError, Error);

/**
 * JSON representation of the error
 * @param {boolean} includeStack to include the error stack
 */
HTTPError.prototype.toJSON = function (includeStack) {
    var obj = {
        name: this.name,
        message: this.message,
        status: this.status,
        errors: this.errors
    };

    if (includeStack)
        obj.stack = this.stack;

    return obj;
};

module.exports = HTTPError;