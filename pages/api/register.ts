import type { NextApiRequest, NextApiResponse } from "next";
import { clientPromise } from "./_dbconn";
import { Collection, MongoClient } from "mongodb";
import { authSaltRounds, userDb, userCollection } from "./_constants";
import userModel from "../../models/authModels";
import fetchModel from "../../models/fetchModels";
import { fetchData } from "./_helpers/fetchProjections";
const sanitize = require("mongo-sanitize");

const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client: Promise<MongoClient> = await clientPromise;
  const collection: Collection = (await client)
    .db(userDb)
    .collection(userCollection);

  if (req.method == "POST") {
    let user: userModel = {
      username: sanitize(req.body.username),
      password: sanitize(req.body.password),
      email: sanitize(req.body.email),
    };
    const hash = await bcrypt.hash(user.password, authSaltRounds);
    user.password = hash;
    let regStatus: boolean = false;
    let status;
    let message;
    const fetcher: fetchModel = {
      collection: "users",
      database: "entrevista",
      filter: {
        username: user.username,
      },
      projection: {
        _id: 0,
        username: 1,
      },
      all: false,
    };
    let result = await fetchData(fetcher);
    if (result === null) {
      delete fetcher.filter["username"];
      fetcher.filter["email"] = user.email;
      result = await fetchData(fetcher);

      if (result === null) {
        regStatus = true;
      } else if (result === "error") {
        regStatus = false;
        status = 504;
      } else {
        message = "emailExists";
        regStatus = false;
      }
    } else if (result === "error") {
      regStatus = false;
      status = 504;
    } else {
      message = "usernameExists";
      regStatus = false;
    }
    if (regStatus === true) {
      try {
        await collection.insertOne(user);
        message = "success";
      } catch {
        status = 504;
      }
    }
    if(status==504){
        message = "Internal server error";
    }
    res.json({ message: message});

  }
  else{
    res.status(405).send("Not allowed;");
  }
}
