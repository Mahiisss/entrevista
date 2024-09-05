import { NextApiRequest,NextApiResponse } from "next";
import fetchModel from "../../models/fetchModels";
const bcrypt = require("bcrypt");
import { authSaltRounds } from "./_constants";
import { fetchData } from "./_helpers/fetchProjections";
import { generateJWT } from "./_helpers/tokenMgr";
const sanitize = require("mongo-sanitize");

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="POST"){
        let username:string = req.body.username;
        let password:string = req.body.password;
        let statusCode = 200;
        let message;
        let fetcher:fetchModel = {
            collection:"users",
            database:"entrevista",
            filter:{
                username:sanitize(username),
            },
            projection:{
                password:1,
                _id:0
            },
            all:false
        };
        let result = await fetchData(fetcher);
        if(result==="error"){
            statusCode = 504;
        }
        else if(result===null){
            message = "User not found";
        }
        else{
            let passValid = await bcrypt.compare(password,result.password);
            if(passValid===false){
                message = "Invalid password";
            }
            else{
                res.json({"message":"success","token":generateJWT(username)});
                return;
            }
        }
        if(statusCode===504){
            message = "Internal server error";
        }
        console.log(message);
        res.status(statusCode).json({"message":message});
    }
    else{
        res.status(405).send("Method not allowed");
    }
}