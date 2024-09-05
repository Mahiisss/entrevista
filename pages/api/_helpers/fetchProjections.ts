import {clientPromise} from "../_dbconn";
import fetchModel from "../../../models/fetchModels";
import {MongoClient} from "mongodb";

async function fetchData(query:fetchModel,sort:number=0,sortFields={},skipNumber=0,limitNumber=0){
    const client:Promise<MongoClient> = await clientPromise;
    const collection = (await client).db(query.database).collection(query.collection);
    let result:any;
    let resultList:any = [];
    let res:any;
    if(query.all===false){
        try{
        result = collection.findOne(query.filter,{projection:query.projection});
        }
        catch{
            result = "error";
        }
    }
    else{
        try{
            if(sort===0){
                res = await collection.find(query.filter).project(query.projection);
            }
            else if(sort===1){
                res = await collection.find(query.filter).project(query.projection).sort(sortFields);
            }
            else if(sort===2){
                res = await collection.find(query.filter).project(query.projection).sort(sortFields).skip(skipNumber).limit(limitNumber);
            }
            await res.forEach((e:any)=>{
                resultList.push(e);
            });
            result = resultList;
        }

        catch(err){
            console.log(err);
            result = "error";
        }
    }
    return result;
}

export {fetchData};