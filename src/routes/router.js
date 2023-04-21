'use strict';

const dirs = require('../utilities/directories');

module.exports = function (server) {
	//Blog list page, if no route is sent
	server.get('/', function (request, response) {
		response.redirect('/blog');
	});

    require("./blog")(server, configObjects);
    require("./admin")(server, configObjects);
    require("./api")(server, configObjects);
    
    //Catch all - Error page
    server.get('*', function (request, response) {
        response.render(dirs.layouts + '/oops.html');
    });
};

const configObjects = {
	blog: {
		navigation: {
			active: 'blog'
		}
	},
	post: {
		navigation: {
			active: 'post'
		}
	},
	admin: {
		navigation: {
			active: 'admin'
		}
	},
	login: {
		navigation: {
			active: 'login'
		}
	},
	create: {
		navigation: {
			active: 'create'
		}
	}
};