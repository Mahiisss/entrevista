import { Typography } from "@mui/material";
import  Router  from "next/router";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import { API_URL } from "../helpers/_frontendConstants";

function Tag(props: any) {
  return (
    <div 
        onClick={()=>{
            Router.push(`/tags/${props.item[0]}`);
        }}
    className="cursor-pointer ml-10 mr-10 bg-[#2563eb] text-[white] p-2 rounded-2xl text-center hover:bg-[#0369a1]">
      <span>{props.item[0]}</span>
      <span> ({props.item[1]}) </span>
    </div>
  );
}
export default function Tags({ data }: any) {
  let x: any[] = data.message;
  return (
    <div>
      <Navbar />
      <div className="flex flex-col">
        <Typography
          variant="h3"
          className="text-center relative top-5 text-[blue]"
        >
          Tags
        </Typography>

        <div className="mt-10 grid grid-cols-3 block m-auto gap-y-4"
          key={Math.random()}
          //   className="gap-x-2 gap-y-8  relative top-5 grid grid-cols-4 w-fit mt-4"
        >
          {x.map((item) => (
            <Tag key={Math.random()} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  let resp = await fetch(`${API_URL}/api/tags`);
  let data = await resp.json();
  return {
    props: {
      data: data,
    },
  };
}
