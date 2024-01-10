import { nuid } from "../../nats-base-client/nuid.ts";
import {
  createConsumer,
  fill,
  initStream,
} from "nats";
import { NatsConnection } from "../../src/mod.ts";

export async function setupStreamAndConsumer(
  nc: NatsConnection,
  messages = 100,
): Promise<{ stream: string; consumer: string }> {
  const stream = nuid.next();
  await initStream(nc, stream, { subjects: [`${stream}.*`] });
  await fill(nc, stream, messages, { randomize: true });
  const consumer = await createConsumer(nc, stream);

  return { stream, consumer };
}