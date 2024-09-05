import { NextApiRequest,NextApiResponse } from "next";
import { verifyJWT } from "./_helpers/tokenMgr";

export default function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method==="POST"){
        let token = req.body.token;
        res.send(verifyJWT(token));
    }
    else{
        res.status(405).send("Method not allowed");
    }
}
