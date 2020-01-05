
const path = require('path');
const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = [];

function __setMockFiles(newMockFiles) {
  mockFiles = newMockFiles;
}

function existsSync(path) {
    return mockFiles.includes(path);
}

function mkdirSync(path) {
    //creates a file 
    return true;
}

function appendFile(path, text, cb) {
    return true;
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

fs.__setMockFiles = __setMockFiles;
fs.readdirSync = readdirSync;
fs.existsSync = existsSync;
fs.mkdirSync = mkdirSync;
fs.appendFile = appendFile;
module.exports = fs;