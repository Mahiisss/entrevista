const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

function generateJWT(username:string):string{
    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60)*24,
        username: username
      }, jwt_secret);
    return token;
}

function verifyJWT(token:string):boolean{
    try{
        var decoded = jwt.verify(token,jwt_secret);
        console.log(decoded);
    }
    catch(err){
        return false;
    }
    return true;
}

function getUsername(token:string|any):string{
    let username:string="";
    try{
        var decoded  = jwt.verify(token,jwt_secret);
        return decoded.username;
    }
    catch(err){
        console.log(err);
        username = "";
    }
    return username;
}
export {generateJWT,verifyJWT,getUsername};