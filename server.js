var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var spawn = require("child_process").spawn,
    sonar = spawn(__dirname + "/sonar");

var PORT = process.env.PORT || 8080,
    WARNING_DISTANCE = process.env.WARNING_DISTANCE || 6;

var has_warned = false;

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    console.log("client connected!");
});

sonar.stdout.on("data", function(data) {
    var measurement = parseInt(data);
    io.emit("measurement", measurement)
    if (!has_warned && measurement > WARNING_DISTANCE) {
        console.log("door open", measurement);
        has_warned = true;
    }
    else if (measurement <= WARNING_DISTANCE) {
        has_warned = false;
    }
});

http.listen(PORT, function() {
    console.log("listening on", PORT);
});
