import * as React from "react";
import Button from "@mui/material/Button";
import { Text } from "react-native";
import GenerateListOfSongs from "./ListOfSongs";
import SidePane from "./SidePane";
import Link from "@mui/material/Link";

export default class GenrePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.location.state.access_token,
      genreName: this.props.location.state.genre_name,
      songs: [],
    };
    fetch(
      "http://localhost:8080/api/getAllByGenre?genre=" + this.state.genreName,
      {
        method: "GET",
        headers: {
          Authorization: this.state.token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ songs: data });
      })
      .catch((error) => console.error("Error:", error));
  }

  render() {
    return (
      <div>
        <div>{SidePane(this.state.token, this.props)}</div>
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
        <div>{GenerateListOfSongs(this.state.songs, this.state.token)}</div>
      </div>
    );
  }
}
