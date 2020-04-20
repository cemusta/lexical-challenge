[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/cemusta/Sudoku-challenge/blob/master/LICENSE)
[![CodeFactor](https://www.codefactor.io/repository/github/cemusta/lexical-challange/badge)](https://www.codefactor.io/repository/github/cemusta/lexical-challange)

# lexical-challenge

Mini api developed for a coding challenge for checking lexical analysis for any given input. Written and tested with node 12. 

Challenge required to store data in mongodb, so if you want to test mongo db part as well you need to provide a mongo connection to configs.


## How to run

Install dependencies using, `npm install`, then you can directly start api in local environment. (This will use constant files **not mongodb**)

```bash
npm start
```

App is starting with swagger ui so you can directly use it to invoke calls to api, from http://localhost:8080/api-docs/

In order to test app with mongodb connection create a .env file by cloning .env.dist file and edit mongodb connection. if process.env MONGODB_URI is missing app will use a file only non-lexical list as a fallback. 


## Tests and linting

for running tests, use:

```bash
npm run test
```

for checking linting, use:

```bash
npm run lint
```