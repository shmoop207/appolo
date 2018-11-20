import { ChildProcess, exec } from "child_process";

const Table = require('cli-table');

const autocannon = require('autocannon');
let child: ChildProcess, instance;

(async function () {
    switch (process.env.TYPE) {
        case "express":
            console.log("running express");
            child = exec('node ./benchmarks/express.js');
            break;
        case "fastify":
            console.log("running fastify");
            child = exec('node ./benchmarks/fastify.js');
            break;
        case "nest":
            console.log("running nest");
            child = exec('node ./benchmarks/nest.js');
            break;
        default:
            console.log("running appolo");
            child = exec('node ./benchmarks/mock/app.js');
    }

    child.stdout.on('data', function (data) {
        run();
    });

    child.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
})();


function run() {
    const instance = autocannon({
        url: 'http://localhost:3000/test/',
        connections: 100,
        pipelining: 10,
        duration: 10
    });

    instance.on('done', (result) => {
        let table = new Table({
            head: ['name', 'average', 'min', 'max']
        });

        table.push(
            ["Latency", result.latency.average, result.latency.min, result.latency.max],
            ["Req/Sec", result.requests.average, result.requests.min, result.requests.max]
        );

        console.log(table.toString());

        setTimeout(() => {
            child.removeAllListeners();
            child.kill();
            process.exit(0);
        }, 10)
    });

    process.once('SIGINT', () => kill())
}

function kill() {
    process.kill(child.pid);
    instance.stop();
}