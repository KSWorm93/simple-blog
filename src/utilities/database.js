'use strict';

const fsp = require('fs').promises;
const { create } = require('hbs');
const dirs = require('../utilities/directories');

function init() {
    console.log('Database - Initializing!');

    return new Promise((resolve, reject) => {
        //Directories needed
        initDirectory().then(() => {
            console.log('Database - Init directories done!');
        })
        //Metadata files needed
        .then(() => initMetadata())
        .then(() => {
            console.log('Database - Init metadata done!');
            resolve();
        })
        .catch((error) => {
            console.log('Database - Init error!');
            console.log(error);
            reject();
        });
    });
}

function createDirectory(dir, dirPath) {
    return new Promise((resolve, reject) => {
        //Check if directory folder exists
        console.log('Database - Checking if directory exists! -', dir);
        return fsp.readdir(dirPath).then((data) => {
            //Detected directory
            if (data.length) {
                console.log('Database - Found directory! -', dir);
            }
        }).then(() => {
            resolve();
        }).catch(() => {
            //Directory folder does not exist, attempt creation
            console.log('Database - Directory not detected! -', dir);
            console.log('Database - Attempt creation of directory! -', dir);
            return fsp.mkdir(dirPath).then(() => {
                //Created directory
                console.log('Database - Successfully created directory! -', dir);
            }).then(() => {
                resolve('Created directory -', dir);
            }).catch((error) => {
                //Failed to create database folder
                console.log('Database - Failed to create directory! -', dir);
                console.log(error);
                reject('Database - Failed to create directory -', dir);
            });
        });
    });
}

function initDirectory() {
    //Promise chain to create the needed directories
    return new Promise((resolve, reject) => {
        // ./database
        createDirectory('database', dirs.database)
        // ./database/blogData
        .then(() => createDirectory('blogData', dirs.blogData))
        .then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });
};

function createMetadata(file, filePath) {
    return new Promise((resolve, reject) => {
        //Check if file exists
        console.log('Database - Checking if metadata file exists! -', file);
        return fsp.access(filePath + '/' + file, fsp.constants.W_OK).then(() => {
            //Detected file
            console.log('Database - Found file! -', file);
        }).then(() => {
            resolve();
        }).catch(() => {
            //File does not exist, attempt creation
            console.log('Database - File not detected! -', file);
            console.log('Database - Attempt creation of file! -', file);
            return new Promise((resolveMeta, rejectMeta) => {
                //Prepare metadata
                scanForPosts().then((posts) => {
                    resolveMeta(posts);
                }).catch((error) => {
                    console.log('Database - No existing posts detected!');
                    rejectMeta(error);
                });
            }).then((posts) => {
                //Construc the metadata object
                const metadataContent = {
                    version: 'v1.0.0',
                    name: 'simple-blog',
                    postsCount: posts.length,
                    posts: posts
                };
                
                //write file
                console.log('Database - Writing metadata file: ' + JSON.stringify(metadataContent));
                return fsp.writeFile(filePath + '/metadata.json', JSON.stringify(metadataContent, null, '\t')).then(() => {
                    //Created file
                    console.log('Database - Successfully created file! -', file);
                }).then(() => {
                    resolve('Created file -', file);
                }).catch((error) => {
                    //Failed to create database folder
                    console.log('Database - Failed to create file! -', file);
                    console.log(error);
                    reject('Database - Failed to create file -', file);
                });
            }).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
            });
        });
    });
}

function initMetadata() {
    //Promise chain to create the needed metadata files
    return new Promise((resolve, reject) => {
        createMetadata('metadata.json', dirs.database)
        .then(() => {
            resolve();
        }).catch((error) => {
            reject();
        });
    });
}

function scanForPosts() {
    const postsDir = dirs.blogData;
    //It is assumed, that once this is called, all needed folders already exists, so checks will be skipped.
    return new Promise((resolve, reject) => {
        const posts = [];
        // Get all directories in path
        return fsp.readdir(postsDir, { withFileTypes: true }).then((data) => {
            // Detected directory
            if (data.length) {
                posts.push(data.filter(post => post.isDirectory()).map(post => post.name));
            }
        }).then(() => {
            resolve(posts);
        }).catch(() => {
            // Directory folder does not exist, attempt creation
            console.log('Database - Could not find directory! -', postsDir);
            reject();
        });
    });
}

function readBlogPost() {
    return false;
}

function writeBlogPost(blogData) {
    console.log('writeBlogPost - start');
    
    return new Promise ((resolve, reject) => {
        resolve(readMetadata());
    }).then((metadata) => {
        const fileName = JSON.parse(metadata).postsCount.toString();
        const blogPath = dirs.blogData + '/' + fileName;
        const blogPostFile = blogPath + '/' + fileName + '.json';

        //TODO - use blogData param for the data
        const content = {
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

        createDirectory(fileName, blogPath)
        .then(() => {
            fsp.writeFile(blogPostFile, JSON.stringify(content, null, '\t'), err => {
                if (err) {
                    return false;
                }
                return true;
            });
        });
    });
}

function updateBlogPost(id, blogData) {
    return false;
}

function readMetadata() {
    return fsp.readFile(dirs.staticFiles.metadata, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        return data;
      });
}

function writeMetadata(metadata) {
    return false;
}

function updateMetadata(id, metadata) {
    return false;
}

module.exports = {
    init: init,
    readMetadata: readMetadata,
    writeBlogPost: writeBlogPost
};
