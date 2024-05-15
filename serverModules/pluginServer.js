const express = require('express');
const http = require('http');
const path = require('path');
const { getConfig } = require('./configHandler');
const { openapiSpecification, setURL } = require('./swaggerSetup');
const {addApi} = require("./apiRoutes");
const {log, getLog} = require("./logger");
const {initTunnel} = require("./setupTunnel");

module.exports = async () => {
    log('Starting server');
    log('Checking config');

    const config = await getConfig();

    //log('got config', config);
    const expressApp = express();
    const server = http.createServer(expressApp);
    expressApp.use(express.json());

    log('serving static from', path.join(__dirname, '..', 'public'));
    expressApp.use(express.static(path.join(__dirname, '..', 'public')));

    openapiSpecification(expressApp);

    expressApp.use(require('./auth.js')(log, config));

    let serverUrl = config.productionDomain;
    let activeTunnel;
    addApi(expressApp, config, () => serverUrl, () => activeTunnel && activeTunnel.close());

    expressApp.use((err, req, res, next) => {
        console.error(err.stack); // Log error stack trace to server console
        res.status(500).send({ error: err.message, stack: err.stack });
    });

    server.listen(config.port, () => {
        log('Server running on http://localhost:' + config.port);
        if (config.useLocalTunnel) {
            initTunnel(config).then((data) => {
                    if (!data) {
                        process.exit();
                    } else {
                        activeTunnel = data.tunnel;
                        serverUrl = data.url;
                        log('set url to', data.url);
                    }
                }
            );
        } else {
            setURL(serverUrl);
        }
    });
    return server;
};
