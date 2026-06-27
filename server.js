const WebSocket = require("ws");


const server = new WebSocket.Server({
    port: 3000
});


let players = [];


console.log("Server läuft auf Port 3000");



server.on("connection", socket => {


    console.log("Spieler verbunden");


    players.push(socket);



    socket.on("message", message => {


        console.log("Daten:", message.toString());



        // an alle Spieler senden

        players.forEach(player => {


            if(player.readyState === WebSocket.OPEN){

                player.send(message.toString());

            }


        });


    });



    socket.on("close",()=>{


        console.log("Spieler getrennt");


        players = players.filter(
            p => p !== socket
        );


    });



});
