var express = require("express");
var app = express();
const bodyparser = require("body-parser");
var fs = require("fs");

app.use(express.static('public'));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.get('/', function(req, res){
    console.log("Display test.html");
    res.sendFile(__dirname + "/"+"test.html");
})

app.post('/json', function (req, res) {
    // Prepare output in JSON format
    response = {
       name:req.body.name,
       hp:req.body.hp,
       in:req.body.in,
       mv:req.body.mv,
       cost:req.body.cost,
       size:req.body.size,
    };
    console.log(response);
    fs.appendFile("./unit.txt",JSON.stringify(response),function(err){
        if(err) throw err;
        console.log("data saved in ./unit.txt");
    })
    res.end(JSON.stringify(response));
 })

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port
 
    console.log("App listening at http://%s:%s", host, port)
 })