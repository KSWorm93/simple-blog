'use strict';

//Imports
const express = require('express');
const hbs = require('hbs');
const dirs = require('./utilities/directories');
const db = require('./utilities/database');

//Constants
const server = express();
//Server
const PORT = 8106;
const HOSTNAME = 'http://localhost:';

//Register partials
hbs.registerPartials(dirs.partials);

//Register helpers
require(dirs.utilities + '/handlebarHelpers')(hbs);

//Set engine and views location
server.set('views', dirs.templates);
server.use(express.static(dirs.client))
server.set('view engine', 'html');
server.engine('html', hbs.__express);

//Add routes
require(dirs.routes + '/router.js')(server);

db.init().then(() => {
    console.log('Database - Ready!');
}).catch((error) => {
    console.log('Database - Failed to create! Exiting.');
    throw(error);
}).then(() => {
    //Start the server once database is ready
    server.listen(PORT);
    console.log('Server - Running at: ' + HOSTNAME + PORT);
});
