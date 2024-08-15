import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const connectionstring = process.env.ATLAS_URI || "";

console.log(connectionstring);

const client = new MongoClient(connectionstring);

let conn;
try {
  conn = await client.connect();
  console.log("mongoDB is connected !!!!!! :)");
} catch (e) {
  console.error(e);
}

let db = client.db("users");

export default db;
