import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
              username: this.state.username,
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
