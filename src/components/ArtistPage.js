import * as React from "react";
import GenerateListOfSongs from "./ListOfSongs";
import SidePane from "./SidePane";

export default class ArtistPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.location.state.access_token,
      username: this.props.location.state.username,
      artistName: this.props.location.state.artist_name,
      songs: [],
    };
    fetch(
      "http://localhost:8080/api/getArtistsSongs?artist=" +
        this.state.artistName,
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
      <div style={{ marginBottom: "100px" }}>
        <div>{SidePane(this.state.token, this.state.username, this.props)}</div>
        <div>{GenerateListOfSongs(this.state.songs, this.state.token)}</div>
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
