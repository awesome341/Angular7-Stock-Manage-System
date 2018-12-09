/* Load modules */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* Database configuration */
const database = require('./app/config/dbconfig');


const jsreport = require('jsreport')()

if (process.env.JSREPORT_CLI) {
    // export jsreport instance to make it possible to use jsreport-cli
    module.exports = jsreport
} else {
    jsreport.init().then(() => {
        // running
    }).catch((e) => {
        // error during startup
        console.error(e.stack)
        process.exit(1)
    })
}


var reportingApp = express();
app.use('/report', reportingApp);


/* Init database */
database.init();

/* Init server listening */
const port = process.argv[2] || 3000;
var server = app.listen(port, function() {
    console.log("Server listening on port : " + port);
});

/* Express configuration */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/* Router configuration */
const REST_API_ROOT = '/api';
app.use(REST_API_ROOT, require('./app/routes/Router'));