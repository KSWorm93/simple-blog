'use strict';

const dirs = require('../utilities/directories');

module.exports = function (server, configObjects) {
    //Blog list page
	server.get('/blog', function (request, response) {
		response.render(dirs.layouts + '/blog.html', configObjects.blog);
	});

    //Blog list page
	server.get('/post', function (request, response) {
		response.render(dirs.layouts + '/post.html', configObjects.post);
	});
};
