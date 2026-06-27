const WebSocket = require("ws");
const http = require("http");


// einfacher HTTP Server für Render
const server = http.createServer((req,res)=>{

    res.writeHead(200);
    res.end("Battle X Server läuft");

});


// WebSocket Server
const wss = new WebSocket.Server({
    server
});


let players = [];



wss.on("connection", socket => {


    console.log("Spieler verbunden");


    players.push(socket);



    socket.send(JSON.stringify({
        type:"welcome",
        message:"Verbunden mit Battle X Server"
    }));



    socket.on("message", data=>{


        console.log(
            "Nachricht:",
            data.toString()
        );


        // an alle Spieler senden

        players.forEach(player=>{


            if(player.readyState === WebSocket.OPEN){

                player.send(data.toString());

            }


        });


    });



    socket.on("close",()=>{


        console.log("Spieler getrennt");


        players =
        players.filter(
            p => p !== socket
        );


    });



});



// Render Port

const PORT = process.env.PORT || 3000;


server.listen(PORT,()=>{


console.log(
"Server läuft auf Port " + PORT
);


});
