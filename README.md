# Description

This project is a NodeJS API created without using any external dependencies like express or morgan, that exposes a single endpoint to query data about Stock companies using their symbol. The main goal of this project is to practice NodeJS skills.

Every time a request comes, the application logs some information about it and stores it inside the logs folder inside the projects.

The only request allowed at the moment are the GET requests to a single endpoint /symbol/{symbol-name} any other request will receive an error to the user.
 

## Installation

### Approach #1

Using docker and docker-compose you can build the project by running the following command.

```bash
docker-compose up -d
```

If you already finished the process of testing and interacting with the API, you can free you PC resources by using.

```bash
docker-compose down
```
### Approach #2

Using the node package manager you can run the following commands

```bash
npm install 
npm start
```

## Tests
The tests are made using the Jest framework, and some mock files are placed in folders accordingly to the documentation of the framework. To run the test execute the following command.

```
npm test
```
### Software versions

* NodeJS: v10.16.0
* NPM: 6.9.0
* docker: Docker version 19.03.5, build 633a0ea
* docker-compose: docker-compose version 1.24.1, build 4667896b

Tested using Linux (Ubuntu) and Windows

## Usage

In order to test the software, make sure it is already running and follow the next steps.

### Approach #1
 Open a browser and run and visit the following link
http://localhost:8000/symbol/{symbol} where *{symbol}* can be replaced by on of the stock symbols, for instance aapl, jbl, and more.

### Approach #2
Open a CLI or terminal where you have the cURL software installed and run the following command.


```
curl http://localhost:8000/symbol/{symbol}
curl http://localhost:8000/symbol/OBLN
curl http://localhost:8000/symbol/aapl
curl http://localhost:8000/symbol/jbl
```

if you use a different HTTP Method or request any other endpoint, you will receive and error, for instance:
```
curl --location --request POST 'http://localhost:8000/symbol/aapl'
```
will respond with the following error.

```
{
    "message": "Invalid Path"
}
```
Go ahead and play with it

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Future development
* Improvements in the Logger to rotate files when reaches a given time or size.
* Add more endpoints to include more information about stocks and trading.