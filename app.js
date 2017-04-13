var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();



app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use('/', express.static('../marry-page'));

var router = express.Router();
router.post('/api/fill-in', (req, res) => {
  var name = req.body.name;
  var number = req.body.number;
  fs.appendFile('people', `${name}##${number}\n`);
  res.status(201).send();
});

app.use(router);

function startServer() {
  const server = http.createServer(app);
  server.listen(8889);
}

startServer();
