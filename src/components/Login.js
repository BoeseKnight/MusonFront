import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    var obj;
    this.state = {
      name: null,
      username: null,
      password: null,
      fail: false,
      success: false,
    };
    // this.getData = this.getData.bind(this);
    this.closeFail = this.closeFail.bind(this);
    this.registration = this.registration.bind(this);
  }

  registration() {
    this.props.history.push("/Registration");
  }

  closeFail() {
    this.setState({ fail: false });
  }
  render() {
    // const closeFail = () => {
    //   this.setState({ fail: false });
    // };
    const getData = (data) => {
      if (data == undefined) {
        this.setState({ fail: true });
      } else {
        this.setState({ success: true });
      }
      // } else {
      // }
      // console.log(data);
    };
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
        // .then((data) => getData(data.access_token))
        .then((data) => {
          console.log("Data is: " + data.access_token);
          getData(data.access_token);
          if (data.access_token != null) {
            this.props.history.push("MainPage", {
              access_token: "Bearer " + data.access_token,
              username: this.state.username,
            });
          }
        });
    };
    return (
      <div>
        <div
          style={{ position: "fixed", margin: "10px", top: "0", right: "0" }}
        >
          <Button
            style={{ width: "150px" }}
            variant="contained"
            size="large"
            onClick={this.registration}
          >
            Registration
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
                  onChange={(e) => this.setState({ name: e.target.value })}
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
                  onChange={(e) => this.setState({ username: e.target.value })}
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
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <Button variant="contained" size="large" onClick={handleClick}>
                Login
              </Button>
            </div>
          </Box>
        </div>
        <div>
          <Dialog
            open={this.state.fail}
            onClose={(e) => this.closeFail(e)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Login or Password are wrong!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Check your data and try again!
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}
