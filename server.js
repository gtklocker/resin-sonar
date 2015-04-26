var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var exec = require("child_process").exec;

var port = process.env.PORT || 8080;

function requestDistance(callback) {
    exec("sudo " + __dirname + "/sonar", function(err, stdout, stderr) {
        callback(parseInt(stdout));
    });
}

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    console.log("client connected!");
});

http.listen(port, function() {
    console.log("listening on", port);
});

setInterval(function() {
    requestDistance(function(measurement) {
        io.emit("measurement", measurement);
    });
}, 500);
