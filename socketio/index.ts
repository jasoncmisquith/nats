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

const stream = "CASEUPDATE";
const consumer = "COMPLETE";

// const opts = consumerOpts()
// opts.orderedConsumer()
const js = nc.jetstream();
const completed_consumer = await js.consumers.get(stream, consumer);

const app = express();
const server = createServer(app);
const io = new Server(server);

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});


// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });

while (true) {
    console.log('executing');
    console.log("waiting for messages");
    const messages = await completed_consumer.consume();
    try {
      for await (const m of messages) {
        const msg = jc.decode(m.data);
        msg['seq'] = m.seq;
        console.log(msg);
        console.log(m.seq);
        console.log(m.subject);
        io.emit(m.subject, msg);
        // m.nak();
        m.ack();
      }
    } catch (err: any) {
      console.log(`consume failed: ${err.message}`);
    }
  }

// for await (const msg of sub) {
//     console.log(msg);
//     const data = jc.decode(msg.data);
//     console.log(data);
//     // document.getElementById('1').insertAdjacentHTML('afterend', `<p>${JSON.stringify(data)}</p>`)
// }


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
