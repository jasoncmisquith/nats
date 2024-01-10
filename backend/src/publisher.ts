import { connect, consumerOpts, StringCodec } from "nats";


const nc = await connect({
    servers: ['nats://localhost:4222']
})

nc.publish("accountid.caseupdate")