
process.env.ENVIRONMENT = 'test';

const logger = require('../../lib/logger');
const fs = require('fs');
jest.mock('fs');

describe('Logger  ', () => {
    beforeEach(() => {
        fs.__setMockFiles([]);
    });

    test('Should create a log folder if the file does not exist', (done) => {   
        const req = { url: 'somerandomurl'};
        const res = { statusCode: 400 };       
        const existsSpy = jest.spyOn(fs, 'existsSync');
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync');
        logger(req, res);        
        expect(existsSpy).toHaveBeenCalled();
        expect(mkdirSpy).toHaveBeenCalled();
        mkdirSpy.mockClear();
        existsSpy.mockClear();
        done();
    });

    test('Should not create a log folder if the file does not exist', (done) => {        
        fs.__setMockFiles([process.env.PWD + '/logs/']);
        const req = { url: 'somerandomurl'};
        const res = { statusCode: 400 };       
        const existSpy = jest.spyOn(fs, 'existsSync');
        const mkdiSpy = jest.spyOn(fs, 'mkdirSync');
        logger(req, res);        
        expect(existSpy).toHaveBeenCalled();
        expect(mkdiSpy).not.toHaveBeenCalled();
        mkdiSpy.mockClear();
        existSpy.mockClear();
        done();
    });

    afterEach(() => {
        // Remove all created files
    });
});