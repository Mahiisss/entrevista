import { useEffect, useState } from "react";
import { PrevPageButton, NextPageButton } from "./customBtns";
import postStruct from "../models/postModels";
import PostData from "./postData";
import { useDispatch, useSelector } from "react-redux";
import { selectCreds, setCreds } from "../store/userSlice";
import Loading from "./loading";
import Router from "next/router";

export default function Posts(props: any) {
  const [pageCtr, setPageCtr] = useState(0);
  const [postData, setPostData] = useState<postStruct[]>([]);
  const credSelector = useSelector(selectCreds);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let url:string;
  useEffect(() => {
    if (props.mode == 1) {
      url = `${props.api_url}?id=${pageCtr * 5}`;
    }
    else if(props.mode==2){
        url = `${props.api_url}&id=${pageCtr*5}`;
    }
    fetch(url, {
      headers: {
        token: credSelector.creds.token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPostData(data.message);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        dispatch(
          setCreds({
            creds: {
              username: "",
              token: "",
            },
          })
        );
        Router.push("/");
      });
  }, [pageCtr]);

  function ButtonContainer() {
    return (
      <div style={{ alignSelf: "flex-end" }} className="w-full text-center ">
        <span
          onClick={() => {
            if (pageCtr >= 1) {
              setPageCtr(pageCtr - 1);
              setLoading(true);
            }
          }}
        >
          <PrevPageButton />
        </span>
        <span
          onClick={() => {
            if (postData.length != 0) {
              setPageCtr(pageCtr + 1);
              setLoading(true);
            }
          }}
        >
          <NextPageButton />
        </span>
      </div>
    );
  }

  return (
    <div className="w-full mr-3 ">
      <div className="w-full  p-2">
        {postData.map((data) => (
          <PostData {...data} key={Math.random()} />
        ))}
      </div>
      <div   >
      <div className="text-center text-[blue]">Page Number : {pageCtr + 1}</div>
      <ButtonContainer />
      {loading === true ? <Loading /> : null}
      </div>
    </div>
  );
}
