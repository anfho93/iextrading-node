// This logger can be improved later using rotation files
// and separating the request in multiple files

const fs = require('fs');
const LOG_PATH = (process.env.PWD ? process.env.PWD + '/logs/' : 'logs/');
const LOG_FILENAME = 'access.log';

/**
 * Logger function for the user
 * @param {*} req 
 * @param {*} res 
 */
const logger = function (req, res) {
    const current_datetime = new Date();
    const day = current_datetime.getDate();
    const month = current_datetime.getDate() + 1;
    const hours = current_datetime.getHours();
    const minutes = current_datetime.getMinutes();
    const seconds = current_datetime.getSeconds();

    // MM/DD/YY HH:mm:ss
    let formatted_date = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${current_datetime.getFullYear()} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    let log = `${formatted_date} url: ${req.url} , statusCode: ${res.statusCode} ${res.statusCode > 399 ? 'Failed' : 'Succeded'} \n`;
    
    if (!fs.existsSync(LOG_PATH)){
        fs.mkdirSync(LOG_PATH);
    }
    fs.appendFile(LOG_PATH + LOG_FILENAME, log, function(err) {
        if (err) {
            return console.log(err);
        }
    }); 
}

module.exports = logger;