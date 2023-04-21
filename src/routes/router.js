const dirs = require('../utilities/directories');

module.exports = function (app) {
	//Blog list page, if no route is sent
	app.get('/', function (request, response) {
		response.redirect('/blog');
	});

	//Blog list page
	app.get('/blog', function (request, response) {
		response.render(dirs.layouts + '/blog.html', configObjects.blog);
	});

    //Blog list page
	app.get('/post', function (request, response) {
		response.render(dirs.layouts + '/post.html', configObjects.post);
	});

	//Admin page
	app.get('/admin', function (request, response) {
		response.render(dirs.layouts + '/admin.html', configObjects.admin);
	});

	//Login page
	app.get('/login', function (request, response) {
		response.render(dirs.layouts + '/login.html', configObjects.login);
	});

	//Create blog post page
	app.get('/create', function (request, response) {
		response.render(dirs.layouts + '/create.html', configObjects.create);
	});

	//Unknown page
	app.get('*', function (request, response) {
		response.render(dirs.layouts + '/oops.html');
	});
}

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