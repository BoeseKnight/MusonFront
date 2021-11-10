import * as React from "react";
import Button from "@mui/material/Button";
import { Text } from "react-native";
import Link from "@mui/material/Link";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import SidePane from "./SidePane";

export default class Artists extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = { token: this.props.location.state.access_token,username: this.props.location.state.username, artists: [] };
    fetch("http://localhost:8080/api/getAllArtists", {
      method: "GET",
      headers: {
        Authorization: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data is: " + data);
        //this.state.genres.push(genre);
        this.setState({ artists: data });
        console.log("State is: " + this.state.artist);
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

    const onPressImage = (artistName, username) => {
      this.props.history.push("ArtistPage", {
        access_token: this.state.token,
        artist_name: artistName,
          username: username,
      });

      const logoOnCLick = () => {
        this.props.history.push("MainPage", {
          access_token: this.state.token,
        });
      };
    };
    return (
      <div>
        <div>
            {SidePane(this.state.token, this.state.username, this.props)}
        </div>
        <div style={{ display: "flex", marginTop: "100px" }}>
          <div style={{ marginLeft: "250px" }}>
            {this.state.artists.map((artist) => {
              return (
                <div style={{ width: "300px", float: "left" }}>
                  <img
                    onClick={() => {
                      onPressImage(artist.artist, this.state.username);
                    }}
                    alt="HTML5"
                    style={{ height: "250px", borderRadius: "10px" }}
                    src={artist.pathToImage}
                  />
                  <h2 style={{ margin: "0" }}>{artist.artist}</h2>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
