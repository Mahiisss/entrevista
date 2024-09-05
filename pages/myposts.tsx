import PostData from "../components/postData";
import Navbar from "../components/navbar";
import { API_URL } from "../helpers/_frontendConstants";
import { useSelector } from "react-redux";
import { selectCreds } from "../store/userSlice";
import { useEffect } from "react";
import Posts from "../components/posts";

export default function MyPosts(){

    let api_url = `${API_URL}/api/myposts`
    return <div>
        <Navbar/>
        <div className="p-4">
        <Posts api_url={api_url} mode={1}/>
        </div>
    </div>
}

