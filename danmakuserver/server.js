"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
const os_1 = require("os");
const numCPUs = os_1.cpus().length;
if (cluster.isMaster) {
    const workers = {};
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();
        workers[worker.id] = worker;
    }
    cluster.on('death', worker => {
        delete workers[worker.id];
        worker = cluster.fork();
        workers[worker.id] = worker;
    });
    for (const worker of Object.values(workers)) {
        worker.on('message', msg => {
            for (const worker of Object.values(workers)) {
                worker.send({ content: msg.content });
            }
        });
    }
}
else if (cluster.isWorker) {
    require('worker.js');
}
//# sourceMappingURL=server.js.map