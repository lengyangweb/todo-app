const express = require('express');

const createServer = () => {
    // init an express app
    var app = express();

    // allow body parser
    app.use(express.json());
    app.use(express.urlencoded({ extended: true  }));

    return app;
}

module.exports = createServer;