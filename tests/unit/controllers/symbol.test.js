process.env.ENVIRONMENT = 'test';

const request = require('supertest');
const app = require('../../../bin/www');
const iexclient = require('../../../lib/iex-client');
jest.mock('../../../lib/iex-client');
const logger = require('../../../lib/logger');
jest.mock('../../../lib/logger');

describe('SymbolController ', () => {
    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
    });

    test('Should get data based on a existing symbol', async (done) => {
        iexclient.quote.mockImplementationOnce(() =>
            Promise.resolve({
                latestPrice: 123465
            })
        );
        iexclient.news.mockImplementationOnce(() =>
            Promise.resolve({
                url: 'someramdomurl'
            })
        );
        iexclient.logoURL.mockImplementationOnce(() =>
            Promise.resolve({
                url: 'someramdomurl'
            })
        );

        request(app)
            .get('/symbol/aapl')
            .end(function (err, res) {
                // console.log(res.body);                
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.latestPrice).toEqual(123465);
                expect(res.body.data.companyLogo).toEqual('someramdomurl');
                expect(res.body.data.latestNews).toEqual({ url: 'someramdomurl' });
                done();
            });
    });

    test('Should add some messages if data is not retrieved', async (done) => {
        iexclient.quote.mockImplementationOnce(() =>
            Promise.resolve({
                latestPrice: 123465
            })
        );
        iexclient.news.mockImplementationOnce(() =>
            Promise.resolve({})
        );
        iexclient.logoURL.mockImplementationOnce(() =>
            Promise.resolve({})
        );

        request(app)
            .get('/symbol/aapl')
            .end(function (err, res) {
                // console.log(res.body);
                expect(res.statusCode).toEqual(200);
                expect(res.body.data.latestPrice).toEqual(123465);
                expect(res.body.data.companyLogo).toEqual('No company logo 😅');
                expect(res.body.data.latestNews).toEqual({});
                done();
            });
    });

    test('Should show invalid path', async (done) => {
        request(app)
            .get('/symbol')
            .end(function (err, res) {
                // console.log(res.body);
                expect(res.body.message).not.toBeNull();
                expect(res.body.message).toEqual('Invalid Path');
                expect(res.statusCode).toEqual(404);
                done();
            });
    });

    test('Should show error when symbol does not exist ', async (done) => {
        request(app)
            .get('/symbol/aaaaaa')
            .end(function (err, res) {
                // console.log(res.body);
                expect(res.body.message).not.toBeNull();
                expect(res.statusCode).toEqual(400);
                done();
            });
    });

    afterAll(async (done) => {
        app.close();
        done();
    });
});


