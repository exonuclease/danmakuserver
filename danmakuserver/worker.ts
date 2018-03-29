import ws = require('ws');
const WebSocketServer = ws.Server;
interface Clients {
  [propname: string]: ws;
}
const clients: Clients = {};
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
