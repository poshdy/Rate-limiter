// create two endpoints //
// post a post & get all post //
// our mission is to design and implement rate limiter on create post endpoint //
// our limiting policy each user is allowed to post only 2 post in every 10s //
// if try to exceed this limit drop the request and reply back with 429 //
// first we will implement logic using maps
// then we will implement the logic using redis

import "dotenv/config";
import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import { rateLimiter } from "./db/rate-limiter.js";

const server = fastify({
  logger: true,
});
server.addHook("preHandler", async (req: FastifyRequest, res: FastifyReply) => {
  const ip = req.ip;
  await rateLimiter(ip, 3, 10000);
});

server.get("/", async (req: FastifyRequest, res: FastifyReply) => {
  await db.insert(users).values({ username: "Ali" });
  res.send("Hello world");
});

server.get("/users", async (req: FastifyRequest, res: FastifyReply) => {
  const allusers = await db.select().from(users);
  res.status(200).send(allusers);
});
server.listen({ port: 8000, host: "0.0.0.0" });
