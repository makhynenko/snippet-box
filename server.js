const url = require('url');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const history = require('connect-history-api-fallback');
const config = require('./webpack.config.dev');

const GRAPHQL_ENDPOINT = 'http://127.0.0.1';
const { hostname } = url.parse(GRAPHQL_ENDPOINT);
const app = express();
const compiler = webpack(config);
const PORT = 4000;

app.use(history());

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    // publicPath should not start with '/' since it breaks the HMR
    publicPath: '',
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(path.join(__dirname, '/dist.prod')));
app.listen(PORT, hostname, (err) => {
    if (err) {
        console.err(err); // eslint-disable-line no-console
        return;
    }
    console.log(`Listening at ${hostname}:${PORT}`); // eslint-disable-line no-console
});
