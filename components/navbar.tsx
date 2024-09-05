import { AppBar, Toolbar } from "@mui/material";
import { Button, Typography } from "@mui/material";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../helpers/authHelpers";
import { selectCreds, setCreds } from "../store/userSlice";

const navBtnStyle = {
  color: "white",
};

export default function Navbar() {
  const dispatch = useDispatch();
  const credSelector = useSelector(selectCreds);
  function LogOut() {
    dispatch(
      setCreds({
        creds: {
          username: "",
          token: "",
        },
      })
    );
    Router.push("/");
  }

  useEffect(() => {
    try{
      verifyToken(credSelector.creds.token).then((resp) => {
        if (resp === false) {
          LogOut();
        }
      });
    }
    catch{
      LogOut();
    }
  }, []);
  return (
    <AppBar style={{ position: "sticky" }}>
      <Toolbar>
        <Button
          style={navBtnStyle}
          onClick={() => {
            Router.push("/dashboard");
          }}
        >
          Dashboard
        </Button>
        <Button
          style={navBtnStyle}
          onClick={() => {
            Router.push("/tags");
          }}
        >
          Tags
        </Button>
        <Button
          style={navBtnStyle}
          onClick={() => {
            Router.push("/myposts");
          }}
        >
          Your Posts
        </Button>
        <Button
          style={navBtnStyle}
          onClick={() => {
            Router.push("/addpost");
          }}
        >
          Add Post
        </Button>
        <Button
          style={navBtnStyle}
          onClick={() => {
            dispatch(
              setCreds({
                username: "",
                token: "",
              })
            );
            Router.push("/");
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
