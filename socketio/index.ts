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
const io = new Server(server, {
  connectionStateRecovery: {
    // // the backup duration of the sessions and the packets
    // maxDisconnectionDuration: 2 * 60 * 1000,
    // // whether to skip middlewares upon successful recovery
    // skipMiddlewares: true,
  }
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/:id', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

let socketdata;
io.on('connection', (socket) => {
  console.log('connected');
  socketdata = socket;
  
  socket.on('joinroom', (roomName) => {
    console.log(socket.recovered);
    
    socket.join(roomName);
    io.to(roomName).emit(roomName, 'User joined the room ' + roomName);
  });


  socket.on('disconnect', (socket) => {
    console.log("User disconnected ", socket);
    
  });
});

while (true) {
    console.log("waiting for messages");
    const messages = await completed_consumer.consume();
    
    try {
      for await (const m of messages) {
        console.log(socketdata!.recovered, 'are the rooms');
        
        const msg = jc.decode(m.data);
        msg['seq'] = m.seq;
        console.log('subject is ', m.subject);
        console.log(msg);
        
        const l = io.to(m.subject).emit(m.subject, msg);
        // console.log(l);
        
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
