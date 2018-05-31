"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws = require("ws");
const WebSocketServer = ws.Server;
const clients = {};
let clientIndex = 0;
const wss = new WebSocketServer({ port: 12000 });
wss.on('connection', ws => {
    clients[clientIndex] = ws;
    const wsIndex = clientIndex;
    clientIndex++;
    ws.on('message', msg => {
        process.send({ content: msg });
        for (const index in clients) {
            if (parseInt(index) !== wsIndex) {
                clients[index].send(msg);
            }
        }
    });
});
process.on('message', msg => {
    for (const client of Object.values(clients)) {
        client.send(msg.content);
    }
});
//# sourceMappingURL=worker.js.map