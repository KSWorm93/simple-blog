'use strict';

const path = require('path');
const dirs = require('../utilities/directories');

module.exports = function (server, configObjects) {
    //Blog Images
	server.get('/static/image/:id/:image', function (request, response) {
		const post = request.params.id;
		const image = request.params.image;

		const imagePath = path.resolve(dirs.blogData + '/' + post + '/' + image);

		console.log('Getting image: ' + imagePath);
		//Construct image path
		response.sendFile(imagePath);
	});

    //Client side JS files
    server.get('/static/js/:id', function (request, response) {
		const fileName = request.params.id;

		const filePath = path.resolve(dirs.js + '/' + fileName);

		console.log('Getting JS file: ' + filePath);
		//Construct image path
		response.sendFile(filePath);
	});

    //Stylesheets
    server.get('/static/css/:id', function (request, response) {
		const fileName = request.params.id;

		const filePath = path.resolve(dirs.css + '/' + fileName);

		console.log('Getting CSS file: ' + filePath);
		//Construct image path
		response.sendFile(filePath);
	});
};
