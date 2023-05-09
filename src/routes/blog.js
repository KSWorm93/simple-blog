'use strict';

const path = require('path');
const dirs = require('../utilities/directories');

module.exports = function (server, configObjects) {
    //Blog list page
	server.get('/blog', function (request, response) {
		response.render(dirs.layouts + '/blog.html', configObjects.blog);
	});

    //Blog list page
	server.get('/post/:id', function (request, response) {
		const post = request.params.id;

		//TODO - create function to get content based on stored data
		//Also see readme for idea
		//For now uses hardcoded post objects
		const getContent = posts[post];
		configObjects.post.content = getContent;

		console.log(getContent);

		response.render(dirs.layouts + '/post.html', configObjects.post);
	});

	server.get('/post/image/:id/:image', function (request, response) {
		const post = request.params.id;
		const image = request.params.image;

		const imagePath = path.resolve(dirs.blogData + '/' + post + '/' + image);

		console.log('Getting image: ' + imagePath);
		//Construct image path
		response.sendFile(imagePath);
	});

};

//#####################
// Hardcoded blog posts
//#####################

const first = {
	title: 'Technologies used!',
	intro: 'This post is about the technologies used in the creation of this project!',
	sections: [
		{
			subTitle: 'Node.js',
			text: 'This project is using Node.js behind the scenes.',
			image: '/post/image/first/image1.svg',
			imageAlt: 'Node.js',
			imageSize: 'medium'
		},
		{
			subTitle: 'Express.js',
			text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			image: '/post/image/first/image2.png',
			imageAlt: 'Express.js',
			imageSize: 'large'
		}
	],
	author: 'Kasper Worm',
	updated: '09-05-2023',
	created: '09-05-2023'
};

const second = {
	title: 'Second post!',
	author: 'Kasper Worm',
	updated: '09-05-2023',
	created: '09-05-2023'
};

const posts = {
	first: first,
	second: second
};