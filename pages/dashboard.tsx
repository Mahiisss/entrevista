import Navbar from "../components/navbar";
import AddPost from "../components/addpost";
import { useEffect, useState } from "react";
import { selectCreds, setCreds } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../helpers/authHelpers";
import Router from "next/router";
import Posts from "../components/posts";
import { API_URL } from "../helpers/_frontendConstants";

export default function Dashboard() {

  let api_url = `${API_URL}/api/posts`;
  return (
    <div>
      <Navbar />
      <div className="flex w-full p-4">
        <Posts api_url={api_url} mode={1}/>
      </div>
    </div>
  );
}

