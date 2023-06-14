'use strict';

const lines = {
    "twenty": '********************',
    "fifteen": '***************',
    "ten": '**********',
    "five": '*****'
};

console.log(lines.twenty);
console.log(lines.five + ' Preparing blog');
console.log(lines.twenty);

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

//Run final logic
(async () => {
    const databaseInitialized = await db.init();
    console.log('Database - Initialized: ' + databaseInitialized);

    if (databaseInitialized) {
        //Start the server once database is ready
        server.listen(PORT);
        console.log('Server - Running at: ' + HOSTNAME + PORT);
    } else {
        console.log('Database - Failed to initialize! Exiting.');
        throw ('ERROR - Failed to initialize!');
    }

    //Testing database function
    // const written = await db.writeBlogPost();
    // const written = await db.getBlogPost('4');

})();
