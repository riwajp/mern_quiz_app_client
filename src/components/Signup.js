import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Signup = (props) => {
  const [fname, update_fname] = useState();
  const [lname, update_lname] = useState();
  const [email, update_email] = useState();
  const [password, update_password] = useState();
  const [show_loader, update_show_loader] = useState(false);
  const [email_exists, update_email_exists] = useState(false);

  function submit() {
    update_show_loader(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
      }),
    };
    fetch("https://quizapp-riwajprasai.herokuapp.com/signup", requestOptions)
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        update_show_loader(false);
        if (data.response === "success") {
          props.update_currentPage("login");
        } else {
          update_show_loader(false);
          update_email_exists(true);
        }
      });
  }
  return (
    <div className="signup_bg">
      {show_loader === false ? (
        <div className="signup_container">
          <div className="signup_title">Sign Up</div>
          <br />
          <br />
          <span style={{ display: "inline-block" }}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              value={fname}
              onChange={(e) => update_fname(e.target.value)}
            />
            &nbsp;&nbsp;
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              value={lname}
              onChange={(e) => update_lname(e.target.value)}
            />
          </span>
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
          {email_exists === true ? (
            <font color="red">
              *Email already registered
              <br />
            </font>
          ) : (
            ""
          )}
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
          <br />
          Already registered?{" "}
          <button
            onClick={() => props.update_currentPage("login")}
            className="login_in_signup"
          >
            Login
          </button>
        </div>
      ) : (
        <CircularProgress color="secondary" className="loader" />
      )}
    </div>
  );
};

export default Signup;
