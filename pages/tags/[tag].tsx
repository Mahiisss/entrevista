import {useRouter} from "next/router";
import { useEffect, useState } from "react";
import Posts from "../../components/posts";
import { API_URL } from "../../helpers/_frontendConstants";
import Navbar from "../../components/navbar";

export default function TagFilter(){
    const router = useRouter();
    const [tag,setTag] = useState(false);
    const [tagName,setTagName] = useState<any>("react");
    useEffect(()=>{
        if(!router.isReady){
            return;
        }
        setTag(true);
        setTagName(router.query.tag);
    },[router.isReady])
    return <div>
        <Navbar/>
        <div className="ml-5">
        {tag?<Posts mode={2} api_url={`${API_URL}/api/posts?tag=${tagName}`}/>:<div></div>}
        </div>
    </div>
}