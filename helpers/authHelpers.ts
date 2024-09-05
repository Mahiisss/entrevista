import { useDispatch } from "react-redux";
import { setCreds } from "../store/userSlice";
import { API_URL } from "./_frontendConstants";
import Router from "next/router";

function validateEmail(email:string):boolean{
    const res = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return res===null?false:true;
}

function validatePassword(password:string):boolean{
    // min 8 letter password, with at least a symbol, upper and lower case letters and a number
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
}

async function verifyToken(token:string){
    let loggedIn:boolean = false;
    const resp = await fetch(API_URL+"/api/validate",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({token:token})
    });
    const data = await resp.text();
    data==="true"?loggedIn=true:false;
    return loggedIn;
}


export {validateEmail,validatePassword,verifyToken};