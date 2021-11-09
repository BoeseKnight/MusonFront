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
import { useHistory } from "react-router-dom";
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

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    var obj;
    this.state = { name: null, username: null, password: null };
  }

  render() {
    const handleClick = (e) => {
      e.preventDefault();
      const user = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
      };
      console.log(user);
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("username", this.state.username);
      formData.append("password", this.state.password);
      fetch("http://localhost:8080/api/myLogin", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data is: " + data.access_token);
          if (data.access_token != null) {
            this.props.history.push("MainPage", {
              access_token: "Bearer " + data.access_token,
            });
          }
        })
        .catch((error) => console.error("Error:", error));
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
          <h1>AUTHORIZATION FORM</h1>
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
                value={this.state.name}
                onChange={(e) => (this.state.name = e.target.value)}
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
                value={this.state.username}
                onChange={(e) => (this.state.username = e.target.value)}
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
                value={this.state.password}
                sx={{ width: "50ch" }}
                onChange={(e) => (this.state.password = e.target.value)}
              />
            </div>
            <Button variant="contained" size="large" onClick={handleClick}>
              Login
            </Button>
          </div>
        </Box>
      </div>
    );
  }
}
