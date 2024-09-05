import {
  validatePassword,
  validateEmail,
  verifyToken,
} from "../helpers/authHelpers";
import { Button, Input } from "@mui/material";
import TextField from "@mui/material/TextField";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { API_URL } from "../helpers/_frontendConstants";
import { useDispatch, useSelector } from "react-redux";
import { selectCreds, setCreds } from "../store/userSlice";
import Router from "next/router";
import Loading from "../components/loading";

const textFieldStyle = {
  display: "block",
  marginBottom: "8px",
};
interface regStruct {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

interface loginStruct {
  username: string;
  password: string;
}

interface errorStruct {
  loginUsername: boolean;
  loginPassword: boolean;
  passChangeEmail: boolean;
  registerUsername: boolean;
  registerPassword: boolean;
  registerConfirm: boolean;
  registerEmail: boolean;
}
export default function Home() {
  const [curMode, setCurMode] = useState<string>("login");
  const [errors, setErrors] = useState<errorStruct>({
    loginUsername: false,
    loginPassword: false,
    passChangeEmail: false,
    registerUsername: false,
    registerPassword: false,
    registerConfirm: false,
    registerEmail: false,
  });
  const [regData, setRegData] = useState<regStruct>({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [loginData, setLoginData] = useState<loginStruct>({
    username: "",
    password: "",
  });

  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const credSelector = useSelector(selectCreds);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (credSelector.creds) {
      verifyToken(credSelector.creds.token).then((resp) => {
        if (resp === true) {
          Router.push("/dashboard");
        }
      });
    }
  });
  function SubmitRegistrationForm() {
    let emailValStatus: boolean = validateEmail(regData.email);
    let someError: boolean = false;
    let errs: errorStruct = {
      loginUsername: false,
      loginPassword: false,
      passChangeEmail: false,
      registerUsername: false,
      registerPassword: false,
      registerConfirm: false,
      registerEmail: false,
    };

    if (regData.username.length === 0) {
      someError = true;
      errs.registerUsername = true;
    }
    if (emailValStatus === false) {
      someError = true;
      errs.registerEmail = true;
    }
    if (validatePassword(regData.password) == false) {
      someError = true;
      alert(
        "Password requirements: at least 8 characters, at least one symbol, upper and lower case letters and a number"
      );
      errs.registerPassword = true;
    }
    if (regData.password != regData.confirm) {
      someError = true;
      errs.registerConfirm = true;
    }
    if (!someError) {
      setLoading(true);
      fetch(API_URL + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regData),
      })
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          if (data.message === "success") {
            setRegData({ username: "", email: "", password: "", confirm: "" });
            alert("Registration successful");
            setCurMode("login");
          } else if (data.message === "emailExists") {
            alert("Email already exists");
            errs.registerEmail = true;
          } else if (data.message === "usernameExists") {
            alert("Username already exists");
            errs.registerUsername = true;
          } else {
            alert(data.message);
          }
          setLoading(false);
        })
        .catch((err) => console.log(`error: ${err}`));
    }
    setErrors(errs);
  }

  function SubmitLoginForm() {
    let errs: errorStruct = {
      loginUsername: false,
      loginPassword: false,
      passChangeEmail: false,
      registerUsername: false,
      registerPassword: false,
      registerConfirm: false,
      registerEmail: false,
    };
    let errorExists = false;
    if (loginData.username.length == 0) {
      errs.loginUsername = true;
      errorExists = true;
    }
    if (loginData.password.length == 0) {
      errs.loginPassword = true;
      errorExists = true;
    }
    if(errorExists){
      setLoading(false);
    }
    else {
      fetch(API_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.message === "Invalid password") {
            alert("Invalid password");
            errs.loginPassword = true;
            setLoading(false);

          } else if (data.message === "User not found") {
            alert("User not found");
            errs.loginUsername = true;
            setLoading(false);
          } else {
            dispatch(
              setCreds({
                creds: {
                  username: loginData.username,
                  token: data.token,
                },
              })
            );
            Router.push("/dashboard");
            setLoginData({ username: "", password: "" });

          }
          setErrors(errs);

        })
        .catch((err) => console.log(err));
    }
    setErrors(errs);
  }

  function SubmitChangePassForm() {
    console.log(email);
  }

  function Login() {
    return (
      <div className="py-4 px-2">
        <TextField
          label="Username"
          error={errors.loginUsername}
          style={textFieldStyle}
          onChange={(e) => {
            setLoginData({
              username: e.target.value,
              password: loginData.password,
            });
          }}
        />

        <TextField
          type="password"
          label="Password"
          error={errors.loginPassword}
          style={textFieldStyle}
          onChange={(e) => {
            setLoginData({
              username: loginData.username,
              password: e.target.value,
            });
          }}
        />
        <Button
          variant="contained"
          className={styles.buttonStyle}
          onClick={()=>{
            SubmitLoginForm();
            setLoading(true);
          }}
        >
          Submit
        </Button>
        <p
          className="text-[blue] mt-3"
          onClick={() => {
            setCurMode("forgot");
          }}
        >
          Forgot Credentials?
        </p>
        <p
          className="text-[blue] mt-3"
          onClick={() => {
            setCurMode("register");
          }}
        >
          Do not have account? Register
        </p>
      </div>
    );
  }

  function Register() {
    return (
      <div className="px-2 py-4">
        <TextField
          label="Username"
          style={textFieldStyle}
          error={errors.registerUsername}
          onChange={(e) => {
            setRegData({
              username: e.target.value,
              password: regData.password,
              confirm: regData.confirm,
              email: regData.email,
            });
          }}
        />
        <TextField
          label="Email"
          error={errors.registerEmail}
          style={textFieldStyle}
          onChange={(e) => {
            setRegData({
              username: regData.username,
              password: regData.password,
              confirm: regData.confirm,
              email: e.target.value,
            });
          }}
        />
        <TextField
          type="password"
          label="Password"
          error={errors.registerPassword}
          style={textFieldStyle}
          onChange={(e) => {
            setRegData({
              username: regData.username,
              password: e.target.value,
              confirm: regData.confirm,
              email: regData.email,
            });
          }}
        />
        <TextField
          type="password"
          error={errors.registerConfirm}
          label="Confirm Password"
          style={textFieldStyle}
          onChange={(e) => {
            setRegData({
              username: regData.username,
              password: regData.password,
              confirm: e.target.value,
              email: regData.email,
            });
          }}
        />
        <Button
          variant="contained"
          className={styles.buttonStyle}
          onClick={()=>{
            SubmitRegistrationForm();
          }}
        >
          Submit
        </Button>
        <p
          className="text-[blue] mt-2"
          onClick={() => {
            setCurMode("login");
          }}
        >
          Already have an account? Login
        </p>
      </div>
    );
  }

  function ForgotPassword() {
    return (
      <div>
        <TextField
          error={errors.passChangeEmail}
          label="Email"
          style={textFieldStyle}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Button
          className={styles.buttonStyle}
          variant="contained"
          onClick={()=>{
            SubmitChangePassForm();
            setLoading(true);
          }}
        >
          Submit
        </Button>
        <p
          className={styles.pStyle}
          onClick={() => {
            setCurMode("login");
          }}
        >
          Back to login
        </p>
      </div>
    );
  }

  return (
    <div className={styles.dblock}>
      {loading === true ? (
        <Loading />
      ) : curMode === "login" ? (
        Login()
      ) : curMode === "forgot" ? (
        ForgotPassword()
      ) : (
        Register()
      )}
    </div>
  );
}
