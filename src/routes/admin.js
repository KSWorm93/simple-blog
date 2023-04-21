'use strict';

const dirs = require('../utilities/directories');

module.exports = function (server, configObjects) {
    //Admin page
    server.get('/admin', function (request, response) {
        response.render(dirs.layouts + '/admin.html', configObjects.admin);
    });

    //Login page
    server.get('/login', function (request, response) {
        response.render(dirs.layouts + '/login.html', configObjects.login);
    });

    //Create blog post page
    server.get('/create', function (request, response) {
        response.render(dirs.layouts + '/create.html', configObjects.create);
    });

    //Create blog post page
    server.get('/create/preview/:id', function (request, response) {
        configObjects.preview = configObjects.create;
        const preview = request.params.id;
        configObjects.preview.preview = preview;
        response.render(dirs.layouts + '/preview.html', configObjects.preview);
    });

};
