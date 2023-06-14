'use strict';

const fsp = require('fs').promises;
const dirs = require('../utilities/directories');

async function init() {
    console.log('Database - Initializing!');

    //Directories needed
    const directoriesReady = await initDirectory();

    //Metadata needed
    let metadataReady = false;
    if (directoriesReady) {
        metadataReady = await initMetadata();
    }

    return directoriesReady && metadataReady;
}

async function initDirectory() {
    // ./database
    const databaseCreated = await createDirectory('database', dirs.database);

    // ./database/blogData
    const blogDataCreated = await createDirectory('blogData', dirs.blogData);

    return databaseCreated && blogDataCreated
};

async function initMetadata() {
    //metadata.json
    const metadataCreated = await createMetadata('metadata.json', dirs.database);
    return metadataCreated;
}

async function directoryExist(dir, dirPath) {
    //Check if directory folder exists
    console.log('Database - Checking if directory exists! -', dir);

    let exists = false;
    try {
        await fsp.readdir(dirPath);
        console.log('Database - Found directory! -', dir);
        exists = true;
    } catch (err) {
        console.log('Database - Directory not found! - ' + dir);
        // console.debug('DirectoryExist() ERROR - ' + err);
    }

    return exists;
}

async function createNewDirectory(dir, dirPath) {
    let created = false;
    console.log('Database - Attempt creation of directory! -', dir);
    try {
        await fsp.mkdir(dirPath)
        //Created directory
        console.log('Database - Successfully created directory! -', dir);
        created = true;
    } catch (err) {
        console.log('Database - Failed to create directory! -', dir);
        // console.debug('createNewDirectory() - ERROR - ' + err);
    }

    return created;
}

async function fileExists(fileName, filePath) {
    let exists = false;
    try {
        await fsp.access(filePath + '/' + fileName, fsp.constants.R_OK | fsp.constants.W_OK);
        console.log('Database - Found file! -', fileName);
        exists = true;
    } catch (err) {
        console.log('Database - Did not find file! -', fileName);
        // console.debug('fileExists() ERROR - ' + err);
    }

    return exists;
}

async function writeFile(fileName, fileDir, content) {
    let fileCreated = false;
    const filePath = fileDir + '/' + fileName + '.json';
    try {
        await fsp.writeFile(filePath, JSON.stringify(content, null, '\t'));
        fileCreated = true;
        console.log('Database - File created successfully1 - ' + fileName);
    } catch (err) {
        fileCreated = false;
        console.log('Database - Failed writing file! - ' + fileName);
        // console.debug('writeFile() - ERROR - ' + err);
    }
    return fileCreated;
}

async function createDirectory(dir, dirPath) {
    //Check if already exists
    const exists = await directoryExist(dir, dirPath);
    if (exists) {
        console.log('Database - Directory already exists: ' + dir);
        return true;
    }

    //Directory does not exists, attempt creation of it
    return await createNewDirectory(dir, dirPath);
}

async function createMetadata(file, filePath) {
    const metadataExists = await fileExists(file, filePath);
    if (metadataExists) {
        return true;
    }

    //File does not exist, attempt creation
    console.log('Database - File not detected! -', file);
    console.log('Database - Attempt creation of file! -', file);
    const posts = await scanForPosts();

    //Construct the metadata object
    const metadataContent = {
        version: 'v1.0.0',
        name: 'simple-blog',
        postsCount: posts.length,
        posts: posts
    };

    //write file
    console.log('Database - Writing metadata file: ' + JSON.stringify(metadataContent));
    const metadataWritten = writeFile('metadata', filePath, metadataContent);
    return metadataWritten;
}

async function scanForPosts() {
    const postsDir = dirs.blogData;
    let posts = [];
    try {
        posts = await fsp.readdir(postsDir, { withFileTypes: true });
        posts = posts.filter(post => post.isDirectory());
        posts = posts.map((post) => post.name);
    } catch (err) {
        console.log('Database - Failed to scan for posts! - ' + postsDir);
        console.debug('scanForPosts() - ERROR - ' + err);
    }

    return posts;
}

async function writeBlogPost(blogData) {
    //Get filename based on count
    const metadata = JSON.parse(await readMetadata());
    const blogPostName = metadata.postsCount.toString();
    const blogPostDir = dirs.blogData + '/' + blogPostName;

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
    //Check if directory exists, otherwie create it
    const directoryCreated = await createDirectory(blogPostName, blogPostDir);

    let fileCreated = false;
    if (directoryCreated) {
        //TODO - introduce check if file exists?
        //Create file
        fileCreated = await writeFile(blogPostName, blogPostDir, content);
    }

    //Update metadata count if file was created
    if (fileCreated) {
        metadata.postsCount += 1;
        metadata.posts.push(blogPostName);
        const metadataUpdated = await updateMetadata(metadata);
        if (metadataUpdated) {
            console.log('Database - Updated metadata count!')
        }
    }

    return fileCreated;
}

async function updateMetadata(metadata) {
    const updated = await writeFile('metadata', dirs.database, metadata);
    return updated;
}

async function readFile(filePath) {
    let fileData;
    try {
        const data = await fsp.readFile(filePath, { encoding: 'utf8' });
        fileData = data;
    } catch (err) {
        console.log(err);
    }
    return fileData;
}

async function readMetadata() {
    const metadata = await readFile(dirs.staticFiles.metadata);
    return metadata;
}

async function getBlogPost(id) {
    const metadata = await readMetadata();
    if (metadata && JSON.parse(metadata).posts && JSON.parse(metadata).posts.indexOf(id) > -1) {
        const blogDirPath = dirs.blogData + '/' + id + '/' + id + '.json';
        const blogPost = await readFile(blogDirPath);
        return JSON.parse(blogPost);
    }
}

module.exports = {
    init: init,
    writeBlogPost: writeBlogPost,
    getBlogPost: getBlogPost
};
