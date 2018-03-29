import cluster = require('cluster');
import { cpus } from 'os';
const numCPUs = cpus().length;

interface Workers {
  [propname: string]: cluster.Worker;
}
if (cluster.isMaster) {
  const workers: Workers = {};
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
} else if (cluster.isWorker) {
  require('worker.js');
}
