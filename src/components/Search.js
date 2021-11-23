import * as React from "react";
import SidePane from "./SidePane";
import GenerateListOfSongs from "./ListOfSongs";
import TextField from "@mui/material/TextField";
import { FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = {
      searchParam: null,
      token: this.props.location.state.access_token,
      username: this.props.location.state.username,
      likedSongs: [],
    };
  }
  logoOnCLick() {
    this.props.history.push("MainPage", {
      access_token: this.state.token,
    });
  }
  render() {
    const search = (e) => {
      e.preventDefault();
      fetch(
        "http://localhost:8080/api/search?searchParam=" +
          this.state.searchParam,
        {
          method: "GET",
          headers: {
            Authorization: this.state.token,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          this.setState({ likedSongs: data }, () => {
            console.log("After fetch in collection");
            console.log(this.state.likedSongs);
          });
        })
        .catch((error) => console.error("Error:", error));
    };
    return (
      <div style={{ marginBottom: "100px" }}>
        {console.log("In collection")}
        {console.log(this.state.token)}
        {console.log(this.state.username)}
        <div>{SidePane(this.state.token, this.state.username, this.props)}</div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            marginLeft: "250px",
          }}
        >
          <TextField
            InputProps={{
              style: {
                color: "white",
              },
            }}
            label="Search"
            variant="outlined"
            value={this.state.searchParam}
            onChange={(e) => this.setState({ searchParam: e.target.value })}
            style={{ marginTop: "10px" }}
            sx={{
              width: "50ch",
              "& label.Mui-focused": {
                color: "white",
              },
              "& label": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                  borderWidth: "5px",
                  borderRadius: "40px",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderWidth: "5px",
                  borderColor: "white",
                },
              },
            }}
          />
          <Button
            sx={{
              "&:hover": {
                opacity: 0.5,
              },
            }}
          >
            <FaSearch
              style={{
                fontSize: "28px",
                marginLeft: "10px",
                marginTop: "10px",
                color: "white",
              }}
              onClick={search}
            />
          </Button>
        </div>
        <div>
          {GenerateListOfSongs(this.state.likedSongs, this.state.token)}
        </div>
        <div
          style={{
            position: "fixed",
            marginLeft: "250px",
            padding: "5px",
            backgroundColor: "#111113",
            // margin: "10px",
            display: "block",
            overflow: "hidden",
            // width: "100%",
            bottom: "0",
            left: 0.5,
            right: 0.5,
            // right: "0",
          }}
        >
          <audio
            style={{ width: "600px" }}
            controls
            id="audio-element"
            type="audio/mpeg"
          ></audio>
        </div>
      </div>
    );
  }
}
