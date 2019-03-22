//server.js

const express = require('express');

const app = express();

const path = require('path');

app.use(express.static('./dist/todo-app'));

app.get('/*', function(req, res) {

  res.sendFile(path.join('./dist/todo-app/index.html'));

});

app.listen(process.env.PORT || 8080);