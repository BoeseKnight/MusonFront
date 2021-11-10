import * as React from "react";
import Button from "@mui/material/Button";
import { Text } from "react-native";
import Link from "@mui/material/Link";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import SidePane from "./SidePane"
import GenerateListOfSongs from "./ListOfSongs";

export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = { token: this.props.location.state.access_token, pause: false,
      play: true, username: this.props.location.state.username, likedSongs:[] };
    fetch("http://localhost:8080/api/getLikedSongs?username=" + this.state.username, {
      method: "GET",
      headers: {
        Authorization: this.state.token,
      },
    })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ likedSongs: data }, () => {
            console.log("After fetch in collection");
            console.log(this.state.likedSongs);
          });
        })
        .catch((error) => console.error("Error:", error));
  }
  logoOnCLick() {
    this.props.history.push("MainPage", {
      access_token: this.state.token,
    });
  }
  render() {
    const artistsOnCLick = () => {
      this.props.history.push("Artists", {
        access_token: this.state.token,
      });
    };
    const logoOnCLick = () => {
      this.props.history.push("MainPage", {
        access_token: this.state.token,
      });
    };
    const genresOnCLick = () => {
      this.props.history.push("Genres", {
        access_token: this.state.token,
      });
    };

    const collectionOnCLick = () => {
      this.props.history.push("Collection", {
        access_token: this.state.token,
      });
    };
    return (
      <div>
        {console.log("In collection")}
        {console.log(this.state.token)}
        {console.log(this.state.username)}
        <div>
            {SidePane(this.state.token, this.state.username, this.props)}
        </div>
        <div
            style={{
              position: "fixed",
              margin: "10px",
              top: "0",
              right: "0",
            }}
        >
          <audio controls id="audio-element" type="audio/mpeg"></audio>
        </div>
          <div>
              {GenerateListOfSongs(this.state.likedSongs, this.state.token, this.state.play, this.state.pause)}
          </div>
      </div>
    );
  }
}
