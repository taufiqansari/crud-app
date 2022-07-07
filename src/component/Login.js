import { Fragment, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmemail: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/homepage");
      }
    });
  });

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  const registerHandler = () => {
    if (registerInformation.email !== registerInformation.confirmemail) {
      alert("Please confirm the email are the same");
      return;
    } else if (
      registerInformation.password !== registerInformation.confirmpassword
    ) {
      alert("Please confirm the password are the same");
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      registerInformation.email,
      registerInformation.password
    )
      .then(() => {
        navigate("/homepage");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Fragment>
      <div className="login_conatiner">
        <h1>CRUD APP</h1>
        {isRegistering ? (
          <>
            <label>Email</label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  email: e.target.value,
                })
              }
              value={registerInformation.email}
            />
            <label>Confirm Email</label>
            <input
              type="email"
              placeholder="Confirm Email"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmemail: e.target.value,
                })
              }
              value={registerInformation.confirmemail}
            />
            <label>PassWord</label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  password: e.target.value,
                })
              }
              value={registerInformation.password}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setRegisterInformation({
                  ...registerInformation,
                  confirmpassword: e.target.value,
                })
              }
              value={registerInformation.confirmpassword}
            />
            <button onClick={registerHandler}>Register</button>
            <button onClick={() => setIsRegistering(false)}>Go Back</button>
          </>
        ) : (
          <>
            <label>Email</label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              onChange={emailHandler}
              value={email}
            />
            <label>PassWord</label>
            <input
              type="password"
              placeholder="password"
              onChange={passwordHandler}
              value={password}
            />
            <button onClick={loginHandler}>Login</button>
            <button onClick={() => setIsRegistering(true)}>
              Create an Account
            </button>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Login;
