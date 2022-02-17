# Parse Server + Express Template
This is a starter template for testing new building tools for Parse Server which used to be Facebook and tiny node server Express. This template uses the below stack.

## Parse Server
[Parse Server](https://parseplatform.org) is an open source backend that can be deployed to any infrastructure that can run Node.js.

## Express
[Express](https://expressjs.com) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.


## Pre-Installation
### for Development
- `npm install -g mongodb-runner` using git-cli with administrator to run on Windows  
### for Production
- install `MongoDB Server` [guide](https://docs.mongodb.com/v5.0/tutorial/install-mongodb-on-os-x/)

## Development
- (Development only)`mongodb-runner start` will install at frist time lauching and start up mongodb     **reqiure `vcredist_x64` installed
- `npm i`
- `npm start`


## Usage
- parse-server api is available via `localhost:6969/parse` by default
- dashboard of parse-server via `localhost:6969/dashboard` by default with admin/12345 as P/W
- static files(like Vue dist files) from folder `/dist` is available as root page via `localhost:6969/` by default 

  see .env/config.env.js for customize configuration


## Environment
- OS:    macOS 12.1 x64
- Node:  16.13.1

## License
Do whatever you want with it!
