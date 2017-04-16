var express = require('express');
var http = require('http');
var fs = require('fs');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({extended: true}));
app.use('/', express.static('../marry-page'));

var router = express.Router();
router.get('/api/check', (req, res) => {
  res.send('checked');
});

router.post('/api/fill-in', (req, res) => {
  var name = req.body.name;
  var number = req.body.number;
  fs.appendFile('people', `${name}##${number}\n`);
  res.status(201).send();
});

router.get('/api/tj', (req, res) => {
  fs.readFile('people', 'utf-8', (err, data) => {
    var d = data.trim().split('\n').map((line) => {
      var data = line.split('##');
      return {name: data[0], number: data[1]};
    });
    res.json(d);
  });
});


app.use(router);

function startServer() {
  const server = http.createServer(app);
  server.listen(8096);
}

startServer();
