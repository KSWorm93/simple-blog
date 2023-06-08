'use strict';

const fsp = require('fs').promises;
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

function initDirectory() {
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

function initMetadata() {
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
    return false;
}

function updateBlogPost(id, blogData) {
    return false;
}

function readMetadata() {
    return false;
}

function writeMetadata(metadata) {
    return false;
}

function updateMetadata(id, metadata) {
    return false;
}

module.exports = {
    init: init
};
