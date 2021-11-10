import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useHistory } from "react-router-dom";

export default function Registration() {
  const [name, setName] = useState("");
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  var match = true;
  const [otvet, setOtvet] = useState();

  const matching = () => {
    if (repeatPassword != password) {
      alert("Entered passwords mismatch");
      match = false;
    }
    console.log(match);
  };

  const getData = (data) => {
    if (data == "This username has already taken by another user.") {
      alert("This username has already taken by another user.");
    } else {
      alert("Registration passed successfully");
      history.push("/Login");
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
    </div>
  );
}
