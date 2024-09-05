import { MongoClient } from "mongodb";

let client;
let clientPromise:any;

const db_url:any = process.env.DB_CONNECTION;
console.log(db_url);



client = new MongoClient(db_url);
clientPromise = client.connect();

export {clientPromise};