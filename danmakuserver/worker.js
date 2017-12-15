var WebSocketServer = require('ws');
var clients = {};
clientIndex = 0;
wss = new WebSocketServer({ port: 12000 });
wss.on('connection', function(ws) {
    clients[clientIndex] = ws;
    var wsIndex = clientIndex;
    clientIndex++;
    ws.on('message', function(msg) {
        process.send({ content: msg });
        for (var index in clients) {
            if (index != wsIndex) {
                clients[index].send(msg);
            }
        }
    });
});
process.on('message', function(msg) {
    for (var client in clients.values()) {
        client.send(msg.content);
    }
});
