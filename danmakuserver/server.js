var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
    var workers = {};
    for (var i = 0; i < numCPUs; i++) {
        worker = cluster.fork();
        workers[worker.pid] = worker;
    }
    cluster.on('death', function (worker) {
        delete workers[worker.pid];
        worker = cluster.fork();
        workers[worker.pid] = worker;
    })
    for (var vorker of workers.values()) {
        workers.on('message', function (msg) {
            for (var worker of workers.values()) {
                worker.send({ content: msg.content });
            }
        })
    }
}
else if (cluster.isWorker) {
    require('worker.js');
}