module.exports = {
    addApi: (app, config, getURL, close) => {

        // here add public apis
        app.get('/api/helloworld', require('../api/helloworld'));
    }
};