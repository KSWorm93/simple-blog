//Imports
const dirs = require('./utilities/directories');
const express = require('express');
const hbs = require('hbs');

//Constants
const app = express();
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
app.set('views', dirs.templates);
app.use(express.static(dirs.client))
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//Add routes
require("./routes/router.js")(app);

//start the server
app.listen(PORT);

console.log("Server running at: " + HOSTNAME + PORT);