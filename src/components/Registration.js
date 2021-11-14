import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Registration() {
  const [name, setName] = useState("");
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  var match = true;
  const [matchingg, setMatching] = useState(false);
  const [nameTaken, setNameTaken] = useState(false);
  const [success, setSuccess] = useState(false);

  const login = () => {
    history.push("/Login");
  };

  const close = () => {
    setMatching(false);
    setNameTaken(false);
  };
  const closeSuccess = () => {
    setSuccess(false);
    history.push("/Login");
  };

  const matching = () => {
    if (repeatPassword != password) {
      match = false;
      setMatching(true);
    }
    console.log(match);
  };

  const getData = (data) => {
    if (data == "This username has already taken by another user.") {
      setNameTaken(true);
    } else {
      setSuccess(true);
    }
    console.log(data);
  };
  const handleClick = (e) => {
    matching();
    e.preventDefault();
    if (match) {
      const user = { name, username, password };
      console.log(user);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("password", password);
      fetch("http://localhost:8080/api/registration", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => getData(data))
        .catch((err) => console.log(err));
      match = true;
    }
  };

  return (
    <div>
      <div style={{ position: "fixed", margin: "10px", top: "0", right: "0" }}>
        <Button variant="contained" size="large" onClick={login}>
          Login
        </Button>
      </div>
      <div style={{ marginTop: "100px" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 3 },
          }}
          noValidate
          autoComplete="off"
          justifyContent="center"
        >
          <h1>REGISTRATION FORM</h1>
          <div style={{ margin: "20px" }}>
            <div style={{ marginBottom: "30px" }}>
              <TextField
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                focused
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{ width: "50ch" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <TextField
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                focused
                id="outlined-basic"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ width: "50ch" }}
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <TextField
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                focused
                id="outlined-basic"
                label="Create a password"
                variant="outlined"
                value={password}
                sx={{ width: "50ch" }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: "30px" }}>
              <TextField
                InputProps={{
                  style: {
                    color: "white",
                  },
                }}
                focused
                id="outlined-basic"
                label="Enter a password again"
                variant="outlined"
                value={repeatPassword}
                sx={{ width: "50ch" }}
                onChange={(e) => setRepeatPassword(e.target.value)}
              />
            </div>
            <Button variant="contained" size="large" onClick={handleClick}>
              Regist
            </Button>
          </div>
        </Box>
        <div>
          <Dialog
            open={matchingg}
            onClose={close}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Passwords missmatch!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Check your passwords and try again!
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={success}
            onClose={closeSuccess}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Registration Passed Successfully!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You will be redirected to Login page!
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <Dialog
            open={nameTaken}
            onClose={close}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Username has already been taken!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Username not available. Try again!
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
