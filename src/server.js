const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');

const filename ="./application.log";
const absFileName = path.resolve(filename);
console.log(absFileName);
console.log("filename: " +filename);

if(fs.existsSync(filename)){
    fs.unlinkSync(filename);
}

require('./logger');

// if (!filename) return util.puts("Usage: node <server.js> <filename>");
let tail;
try {
    tail = spawn("tail", ["-f", filename]).on('error', (error) => console.log(error));
}catch (e) {
    console.log(e)
}
// -- Node.js Server ----------------------------------------------------------
// const server = http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'})
//     fs.readFile(__dirname + '/index.html', function (err, data) {
//         res.write(data, 'utf8');
//         res.end();
//     });
// });

server.listen(3001, '0.0.0.0', () => console.log("Server running at http://0.0.0.0:8000/, connect with a browser to see tail output"));


// const data = fs.readFileSync(absFileName);
// // client.send(data);
// console.log(data.toString());
// -- Setup Socket.IO ---------------------------------------------------------

io.on('connection', function (client) {
    console.log('Client connected');
    // let stream = fs.createReadStream(absFileName);
    const data = fs.readFileSync(absFileName);
    client.send(data.toString());
    // stream.on('data', (data) => client.send(data.toString()));
    tail.stdout.on("data", function (data) {
        // console.log(data.toString('utf-8'))
        // client.send({tail: data.toString('utf-8')})
        io.emit('update log', data.toString());
    });
});
