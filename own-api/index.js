var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4750, function () {
  console.log('Example app listening on port 4750!');
});
