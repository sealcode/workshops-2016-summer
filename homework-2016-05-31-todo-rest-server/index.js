var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var boolParser = require('express-query-boolean');
var path = require('path');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(boolParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/todo.html'));
});

var model = [
    {
        id: "0",
        body: {
            title: "Zadanie 1",
            is_done: true
        }
    },
    {
        id: "1",
        body: {
            title: "Inne zadanie",
            is_done: false
        }
    }
];

var idiotParser = function (stringBool) {
    return stringBool === 'true';
};


app.get('/task', function (req, res) {
    console.log("GET /");
    res.send(model);
});

app.post('/task', function (req, res) {
    console.log("POST / " + JSON.stringify(req.body));
    //console.log("true? " + req.body.is_done + " : " + Boolean(req.body.is_done) + " : " + idiotParser(req.body.is_done));
    var addon = {
        id: String(model.length),
        body: {
            title: req.body.title,
            is_done: idiotParser(req.body.is_done)
        }
    };
    model.push(addon);
    res.send(model[model.length - 1]);
});

app.listen(3000, function () {
    console.log('Uruchomiono serwer na localhost:3000[ctrl+c]');
});
