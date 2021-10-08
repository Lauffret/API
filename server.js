const express = require('express');
//npm install express
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const path = require('path');
const server = express();
var cors = require('cors')

server.use(cors())

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
//npm install ejs
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.set('json spaces', 2);

routes(server);

server.listen(3050,() => {
console.log(" Start on port 3050 ")
});