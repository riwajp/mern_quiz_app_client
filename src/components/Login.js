import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Login = (props) => {
  const [email, update_email] = useState();
  const [password, update_password] = useState();
  const [show_loader, update_show_loader] = useState(false);
  const [invalid_details, update_invalid_details] = useState(false);
  function submit() {
    update_show_loader(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };
    fetch("https://quizapp-riwajprasai.herokuapp.com/login", requestOptions)
      .then((data) => data.json())
      .then((data) => {
        update_show_loader(false);
        if (data.response === "success") {
          console.log(data);
          update_invalid_details(false);
          props.update_user_details(data.details);
          console.log(data.details);
          props.update_currentPage("userhome");
        } else {
          update_invalid_details(true);
        }
      });
  }

  return (
    <div className="signup_bg">
      {show_loader === false ? (
        <div className="signup_container">
          <div className="signup_title">Login</div>
          <br />
          <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => update_email(e.target.value)}
            type="email"
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            style={{ width: "100%" }}
            type="password"
            value={password}
            onChange={(e) => update_password(e.target.value)}
          />
          <br />
          <br />
          <Button
            variant="contained"
            style={{ width: "100%", height: 50 }}
            onClick={() => submit()}
          >
            Submit
          </Button>
          <br />
          {invalid_details === true ? (
            <font color="red">*Invalid Details</font>
          ) : (
            ""
          )}
          <br />
          <br />
          Not registered yet?{" "}
          <button
            onClick={() => props.update_currentPage("signup")}
            className="login_in_signup"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <CircularProgress color="secondary" className="loader" />
      )}
    </div>
  );
};

export default Login;
