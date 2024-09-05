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
            filter:{},
            projection:{_id:0,tags:1},
            all:true
        }
        let s = new Set();
        let response = await fetchData(fetcher,0);
        let allTags = [];
        for(let it of response){
            for(let tag of it.tags){
                s.add(tag);
                allTags.push(tag);
            }
        }
        let x = Array.from(s);
        let resp:any = [];
        let ctr = 0;
        for(let item of x){
            ctr = 0;
            for(let it of allTags){
                if(item==it){
                    ctr++;
                }
            }
            resp.push([item,ctr]);
        }
        res.json({"message":resp});
    }
    
    else{
        res.status(405).send("Method not allowed");
    }
}