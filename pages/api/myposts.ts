import { NextApiRequest,NextApiResponse } from "next";
import postStruct from "../../models/postModels";
import { clientPromise } from "./_dbconn";
import { getUsername } from "./_helpers/tokenMgr";
import {MongoClient}  from "mongodb";
import { userDb,userCollection ,postCollection, postDb} from "./_constants";
import { fetchData } from "./_helpers/fetchProjections";
import fetchModel from "../../models/fetchModels";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="GET"){
        let fetcher:fetchModel = {
            collection:postCollection,
            database:postDb,
            filter:{
                author:getUsername(req.headers["token"])
            },
            projection:{_id:0},
            all:true
        }
        let skipNum:any = req.query.id;
        console.log("Fetching")
        let response = await fetchData(fetcher,2,{created_at:-1},parseInt(skipNum),5);
        res.json({"message":response});
    }
    
    else{
        res.status(405).send("Method not allowed");
    }
}