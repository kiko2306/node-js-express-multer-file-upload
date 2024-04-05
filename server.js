const cors = require('cors');
const express = require('express');
const app = express();

// Setup the base path
global.__basedir = __dirname;

// Setup CORS
let corsOptions = {
    origin: '*',
};

// Add CORS to the app
app.use(cors(corsOptions));

// Path to the routes
const initRoutes = require('./src/routes');

// Setup the app to use URL encoded data
app.use(express.urlencoded({ extended: true }));

// Add the routes to the app
initRoutes(app);

// Setup the port
let port = 8080;

// Start the server
app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
});