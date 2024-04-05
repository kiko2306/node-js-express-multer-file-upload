const express = require('express');
const router = express.Router();
const controller = require('../controller/file.controller');

// Setup the routes
let routes = (app) => {

    // Upload a file
    router.post('/api/upload', controller.upload);
    // Get the list of files
    router.get('/api/files', controller.getListFiles);
    // Download a file
    router.get('/api/files/:name', controller.download);

    // Test the server
    router.get('/ping', (req, res) => {
        res.json({ message: 'pong' });
    });

    // Add the router to the app
    app.use(router);
}

module.exports = routes;