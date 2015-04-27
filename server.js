var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var spawn = require("child_process").spawn,
    sonar = spawn(__dirname + "/sonar");

var port = process.env.PORT || 8080;

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    console.log("client connected!");
});

sonar.stdout.on("data", function(data) {
    io.emit("measurement", parseInt(data))
});

http.listen(port, function() {
    console.log("listening on", port);
});
