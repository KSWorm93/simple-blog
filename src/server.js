'use strict';

//Imports
const dirs = require('./utilities/directories');
const express = require('express');
const hbs = require('hbs');

//Constants
const server = express();
//Server
const PORT = 8106;
const HOSTNAME = 'http://localhost:';

//Register partials
hbs.registerPartials(dirs.partials);

//Register helpers
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('ifEqualsEither', function(arg1, arg2, options) {
    const args = arg2.split(',');
    return (args.includes(arg1)) ? options.fn(this) : options.inverse(this);
});

//Set engine and views location
server.set('views', dirs.templates);
server.use(express.static(dirs.client))
server.set('view engine', 'html');
server.engine('html', hbs.__express);

//Add routes
require("./routes/router.js")(server);

//start the server
server.listen(PORT);

console.log("Server running at: " + HOSTNAME + PORT);