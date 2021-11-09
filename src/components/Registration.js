import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
// import Helmet from 'react-helmet';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Registration() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
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
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
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
              label="Password"
              variant="outlined"
              value={password}
              sx={{ width: "50ch" }}
              onChange={(e) => setPassword(e.target.value)}
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
