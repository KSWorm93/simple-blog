# simple-blog
A project to create a simple designed blog.

## How to run
If you want to run this project, follow these steps!

1. Clone repository
2. Install dependencies with command "npm install"
3. Start application with command "npm run start"
4. Navigate to localhost:8106 in your browser

## How to use - Work in progress, will possibly be changed

1. Use the projects funtionality to create your own blog.

Alternatively import a folder based structure, to construct an existing blog!

1. Create a folder in the root project, called "database".
2. Create a "database" file, which is simply a json file, inside "database".
This file should include an object with each property being a reference to an individual post.
The property should link to the file that will be created in step 5.
3. Create a folder inside "database", called "blogData".
4. Inside the "blogData" folder, create a new folder for each blog post you have.
5. Inside the blog post folder, create a json file for each blog post, it should include data such as title, intro, sections, author, etc.
6. Inside the blog post folder, add images that should be included in that post.

## Example blog post

This is an example of how a blog post could look, when it is stored on the server.

NOTE! - The project does not currently use the above mentioned file structure, instead all the data are hardcoded in the blog.js route.

```
{
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
			text: 'To handle each endpoint, Express.js is used to route the correct places.',
			image: '/post/image/first/image2.png',
			imageAlt: 'Express.js',
			imageSize: 'large'
		}
	],
	author: 'Kasper Worm',
	updated: '09-05-2023',
	created: '09-05-2023'
}
```