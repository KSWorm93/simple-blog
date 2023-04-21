'use strict';

module.exports = function (server, configObjects) {
    //API - Post
    server.get('/API/post/:id', function (request, response) {
        response.statusMessage = "You requested post '" + request.params.id + "', but it has not been implemented yet";
        response.status(501);
        response.redirect('/oops');
	});

    //API - Search
    server.get('/API/list', function (request, response) {
        response.statusMessage = "You requested a list of posts, but it has not been implemented yet.";
        response.status(501);
        response.redirect('/oops');
	});
};
