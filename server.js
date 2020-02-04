const http = require('http');
var traverse = require('traverse');
const axios = require('axios');
var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
var fs = require("fs");

//express server
const app = express();
const BaseUrl="<Put Layout Service URL>";
// cors settings
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/sitecore/api/layout/render/jss', function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    axios.get(BaseUrl+req.url)
        .then((response) => {
        res.send(JSON.parse(JSON.stringify(response.data).replace(/\/-\/media/gi,BaseUrl.concat("/-/media"))));
    });
});

var server = http.createServer(app);
const port = 8000;
server.listen(port, () => console.log(`Example app listening on port ${port}!`));