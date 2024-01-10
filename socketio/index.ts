import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';


import { connect, consumerOpts, JSONCodec } from "nats";


const jc = JSONCodec();
const nc = await connect({
    servers: ["nats://localhost:4222"]
})
const opts = consumerOpts()
opts.orderedConsumer()
stream = nc.jetstream();

const sub = await nc.jetstream().subscribe('accountid', opts)
for await (const msg of sub) {
    console.log(msg);
    const data = jc.decode(msg.data);
    console.log(data)
    // document.getElementById('1').insertAdjacentHTML('afterend', `<p>${JSON.stringify(data)}</p>`)
}


// const app = express();
// const server = createServer(app);
// const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, 'index.html'));
// });



// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });

// server.listen(3000, () => {
//   console.log('server running at http://localhost:3000');
// });