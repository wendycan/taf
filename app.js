const httpProxy = require('http-proxy');
const express = require('express');
const packeageData = require('./package.json');

const app = express();
const apiProxy = httpProxy.createProxyServer({
    changeOrigin: true,
});

app.get('/taf', function(req, res) {
    res.send('three as four');
});

const internalHost = '127.0.0.1:5000';
app.use('/uc', (req, res) => {
    req.url = req.baseUrl + req.url;
    req.headers.hostname = internalHost;
    req.headers.referer = packeageData['taf-target'];

    apiProxy.web(
        req,
        res,
        {
            target: packeageData['taf-target'],
            secure: true,
            changeOrigin: true,
        },
        e => console.log(e)
    );
});

app.listen(3000);
