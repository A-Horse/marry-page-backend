var express = require('express');
var http = require('http');
var fs = require('fs');

var app = express();

var router = express.Router();

router.get('/fill-in', (req, res) => {
  res.json({hi: 'hi'})
})

router.post('/fill-in', (req, res) => {
  var name = req.body.name;
  var number = req.body.number;
  console.log(
    '1'
  );
  fs.writeFile('people', `${name}##${number}\n`);
  res.status(201).send();
});
console.log('start');

app.use(router);

function startServer() {
  const server = http.createServer(app);
  server.listen(8889);
}

startServer();
