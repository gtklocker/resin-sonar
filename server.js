var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var twilio = require("twilio")();
var spawn = require("child_process").spawn,
    sonar = spawn(__dirname + "/sonar");

var PORT = process.env.PORT || 8080,
    WARNING_DISTANCE = process.env.WARNING_DISTANCE || 20,
    MSG_INTERVAL = 60000;

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
    console.log("client connected!");
});

var has_warned = false;
var lastMessage = 0;
sonar.stdout.on("data", function(data) {
    var measurement = parseInt(data);
    io.emit("measurement", measurement)
    if (!has_warned && measurement > WARNING_DISTANCE) {
        console.log("door open", measurement);
        has_warned = true;

        if (+new Date() - lastMessage >= MSG_INTERVAL) {
            twilio.messages.create({
                from: process.env.TWILIO_FROM_NUMBER,
                to: process.env.TWILIO_TO_NUMBER,
                body: "The door has been opened."
            }, function(err, message) {
                if (err) {
                    console.log("There was an error in sending the message.");
                    console.log(err);
                    return;
                }
                lastMessage = message.dateCreated;
                console.log("Message", message.sid, "sent on", message.dateCreated);
            });
        }
    }
    else if (measurement <= WARNING_DISTANCE) {
        has_warned = false;
    }
});


http.listen(PORT, function() {
    console.log("listening on", PORT);
});
