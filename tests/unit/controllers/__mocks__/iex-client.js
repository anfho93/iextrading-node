
const iex = {
    quote: jest.fn(() => Promise.resolve({ data: {} })),
    news: jest.fn(() => Promise.resolve({ data: {} })),
    logoURL: jest.fn(() => Promise.resolve({ data: {} }))
};

module.exports = iex;