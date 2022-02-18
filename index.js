var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
var config = require('./.env/config.env');

const {
  APP_DATABASE_URI,
  APP_NAME,
  APP_ID,
  APP_MASTER_KEY,
  APP_SERVER_URL,
  APP_CLOUD_CODE,
  IS_DEV,
  DASHBOARD_ADMIN_USERNAME,
  DASHBOARD_ADMIN_PASSWORD,
} = config

const ParseServerEndpoint = '/parse';
const ParseDashboardEndpoint = '/dashboard';

const APP_PARSE_SERVER_URL = APP_SERVER_URL + ParseServerEndpoint;


// var FSFilesAdapter = require('@parse/fs-files-adapter');
// var fsAdapter = new FSFilesAdapter({
//   "filesSubDirectory": "my/files/folder" // optional, defaults to ./files
// });

var parse = new ParseServer({
  databaseURI: APP_DATABASE_URI || 'mongodb://127.0.0.1:27017/parse',
  cloud: APP_CLOUD_CODE || __dirname + '/cloud/main.js',
  appId: APP_ID || 'ocZA71Qqqrp5IC0DzsTQ96sUkYQOq6bHzEpw2CsY',
  masterKey: APP_MASTER_KEY || 'MDKWssRkRgXPfJbkBleWAAR7ChNP31XsLKRA1Chm',
  appName: APP_NAME || 'test1',
  serverURL: 'http://localhost:6969/parse',  // Don't forget to change to https if needed, https doesn't work on ssl remote server. I don't remember where I have read it
  // publicServerURL: APP_PARSE_SERVER_URL || 'http://localhost:6969/parse',
  // filesAdapter: fsAdapter


  
  // push: {
  //   android: {
  //     apiKey: '...'
  //   },
  //   ios: {
  //     pfx: './cert/java_use_dev.p12',
  //     passphrase: 'hyweb', // optional password to your p12/PFX
  //     bundleId: 'com.hyweb.formosa.memberapp',
  //     production: true
  //   }
  // }
});

// TODO: change this and understand why i did it
var options = { allowInsecureHTTP: IS_DEV };
var dashboard = new ParseDashboard({
  dev: IS_DEV,
  
	apps: [
    {
      appId: APP_ID,
      masterKey: APP_MASTER_KEY,
      appName: APP_NAME,
      serverURL: APP_PARSE_SERVER_URL,
    }
  ],
  users: [
    {
      user: DASHBOARD_ADMIN_USERNAME,
      pass: DASHBOARD_ADMIN_PASSWORD,
    }
  ],
  }, options);

var app = express();

// Serve static assets from the /public folder
// app.use('/public', express.static(path.join(__dirname, '/public')));
app.use('/', express.static(path.join(__dirname, '/dist')));

// Serve the Parse API on the /parse URL prefix
app.use(ParseServerEndpoint, parse);
app.use(ParseDashboardEndpoint, dashboard);

app.listen(6969);