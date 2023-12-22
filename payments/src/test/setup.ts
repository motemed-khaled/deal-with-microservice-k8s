import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";
import jwt from "jsonwebtoken";

declare global {
  var signin: (id?:string) => string[];
}

jest.mock("../nats-wraper.ts");

let mongo: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const token = jwt.sign(
    {
      id: id || new mongoose.Types.ObjectId().toHexString(),
      email: "mo@mo.com",
    },
    process.env.JWT_KEY!
  );

  const sessionStringify = JSON.stringify({ jwt: token });
  const sessionBase64 = Buffer.from(sessionStringify).toString("base64");
  return [`session=${sessionBase64}`];
};
