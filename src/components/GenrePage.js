import * as React from "react";
import GenerateListOfSongs from "./ListOfSongs";
import SidePane from "./SidePane";

export default class GenrePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.location.state.access_token,
      username: this.props.location.state.username,
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
        <div>{SidePane(this.state.token, this.state.username, this.props)}</div>
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
