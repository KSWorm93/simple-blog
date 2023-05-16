'use strict';

const fsp = require('fs').promises;
const dirs = require('../utilities/directories');

function init() {
    console.log('Database - Initializing!');

    return new Promise((resolve, reject) => {
        initDirectory().then(() => {
            console.log('Database - Init directory done');
        })
        .then(() => initMetadata())
        .then(() => {
            resolve();
        })
        .catch((error) => {
            console.log('Database - Init directory error');
            console.log(error);
            reject();
        });
    });
}

function initDirectory() {
    function createDirectory(dir, dirPath) {
        return new Promise((resolve, reject) => {
            console.log('Database - Checking if directory exists! -', dir)
            //Check if directory folder exists
            return fsp.readdir(dirPath).then((data) => {
                if (data.length) {
                    console.log('Database - Found directory! -', dir);
                }
            //Directory folder does not exist, attempt creation
            }).then(() => {
                resolve();
            }).catch(() => {
                console.log('Database - Directory not detected! -', dir);
                console.log('Database - Attempt creation of directory! -', dir);
                return fsp.mkdir(dirPath).then(() => {
                    console.log('Database - Successfully created directory! -', dir);
                    //Failed to create database folder
                }).then(() => {
                    resolve('Created directory -', dir);
                }).catch((error) => {
                    console.log('Database - Failed to create directory! -', dir);
                    console.log(error);
                    reject('Database - Failed to create directory -', dir);
                });
            })
        });
    }

    //Promise chain to create the needed directories
    return new Promise((resolve, reject) => {
        createDirectory('database', dirs.database)
        .then(() => createDirectory('blogData', dirs.blogData))
        .then(() => {
            resolve();
        }).catch((error) => {
            reject(error);
        });
    });

};

function initMetadata() {
    function createMetadata() {
        return new Promise((resolve, reject) => {
            //Check if metadata file exists
            //If it does, resolve
            //If not, create it
            //If created, resolve
            //If error, reject

            resolve();
        });
    }

    //Promise chain to create the needed metadata files
    return new Promise((resolve, reject) => {
        createMetadata()
        .then(() => {
            resolve();
        }).catch((error) => {
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
