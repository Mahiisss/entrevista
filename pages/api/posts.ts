import { NextApiRequest,NextApiResponse } from "next";
import postStruct from "../../models/postModels";
import { clientPromise } from "./_dbconn";
import { getUsername } from "./_helpers/tokenMgr";
import {MongoClient}  from "mongodb";
import { userDb,userCollection ,postCollection, postDb} from "./_constants";
import { fetchData } from "./_helpers/fetchProjections";
import fetchModel from "../../models/fetchModels";
const sanitize = require("mongo-sanitize");

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="POST"){
        let client:Promise<MongoClient> = await clientPromise;
        let collection = (await client).db(userDb).collection(postCollection);
        let message = "";
        let statusCode = 200;
        let tag_arr = [];
        let ctr = 0;
        for(let item of req.body.tags){
            if(ctr==10){
                break;
            }
            tag_arr.push(item.substring(0,15));
            ctr++;
        }
        let newPost:postStruct = {
            author:getUsername(req.body.token),
            title:sanitize(String(req.body.title).substring(0,25)),
            question:sanitize(String(req.body.question).substring(0,1000)),
            answer:sanitize(String(req.body.answer).substring(0,1000)),
            created_at:(new Date()).getTime(),
            tags:sanitize(tag_arr)
        };
        try{
            collection.insertOne(newPost);
            message = "success";
        }
        catch{
            message = "Internal server error";
            statusCode = 504;
        }
        res.status(statusCode).send(message);
    }
    else if(req.method==="GET"){
        let fetcher:fetchModel = {
            collection:postCollection,
            database:postDb,
            filter:{},
            projection:{_id:0},
            all:true
        }
        let skipNum:any = req.query.id;
        let post_tag = String(req.query.tag);
        if(req.query.tag!=undefined){
            fetcher.filter = {
                tags:sanitize(post_tag)
            }
        }
        console.log(fetcher)

        console.log("Fetching")
        let response = await fetchData(fetcher,2,{created_at:-1},parseInt(skipNum),5);
        console.log(response)
        res.json({"message":response});
    }
    else{
        res.status(405).send("Method not allowed");
    }
}