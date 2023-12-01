const express = require("express");
const socket = require("socket.io");
const app = express();

const mainServer = app.listen(5005, () => {
    try {
        console.log("Server Run on Port Number-5005");
    }
    catch (err) {
        console.log(`Some Error on Port Number-5005 ${err}`);
    }
});

const server = socket(mainServer, {
    cors: {
        origin: '*'
    }
});
const joinUsers = [];

server.on("connection", (users) => {
    users.on("JOIN__ROOM", ({ roomName, userName }) => {
        let tempObj = {
            roomName: roomName,
            userName: userName,
            userID: users.id
        }

        joinUsers.push(tempObj)
        users.join(roomName)
        console.log("User-Connected")

        server.to(roomName).emit("JOINING__ALERT", `${userName} Join The Chat`)

        users.on('Message', (data) => {
            console.log(data)
        });
    });

});
