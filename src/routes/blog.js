'use strict';

const path = require('path');
const dirs = require('../utilities/directories');
const db = require('../utilities/database');

module.exports = function (server, configObjects) {
	//Blog list page
	server.get('/blog', function (request, response) {
		response.render(dirs.layouts + '/blog.html', configObjects.blog);
	});

	//Blog list page
	server.get('/post/:id', async function (request, response) {
		const post = request.params.id;
		console.log('Blog - Getting post: ' + post);

		const blogContent = await db.getBlogPost(post.toString());
		console.log('Blog - Found content: ' + blogContent.title);

		configObjects.post.content = blogContent;

		response.render(dirs.layouts + '/post.html', configObjects.post);
	});

	// server.get('/post/image/:id/:image', function (request, response) {
	// 	const post = request.params.id;
	// 	const image = request.params.image;

	// 	const imagePath = path.resolve(dirs.blogData + '/' + post + '/' + image);

	// 	console.log('Getting image: ' + imagePath);
	// 	//Construct image path
	// 	response.sendFile(imagePath);
	// });

};
