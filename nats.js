import { connect } from "nats";

const servers = [
    {},
    // {servers: ["nats-server:4222"]}
];


async function main() {
    const x = await servers.forEach(createconnection);
}

async function createconnection(server) {
    try {
        const nc = await connect(server);
        console.log(`connected to ${nc.getServer()}`);
        // this promise indicates the client closed
        const done = nc.closed();
        // do something with the connection
    https://wttr.in/
        // close the connection
        await nc.close();
        // check if the close was OK
        const err = await done;
        if (err) {
          console.log(`error closing:`, err);
        }
    } catch (error) {
        console.log(error);
        console.log(`error connecting to ${JSON.stringify(server)}`);
    }
    
}

main();