import * as React from "react";
import Button from "@mui/material/Button";
import { Text } from "react-native";
import Link from "@mui/material/Link";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";

export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = { token: this.props.location.state.access_token };
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
        <div
          style={{
            height: "100%",
            position: "fixed",
            backgroundColor: "#010101",
            width: "250px",
            alignItems: "left",
            display: "flex",
            top: "0",
            left: "0",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              marginTop: "0px",
              padding: "0px",
              textAlign: "left",
            }}
          >
            <li>
              <TouchableHighlight activeOpacity={1} onPress={this.logoOnCLick}>
                <View>
                  <div className="logo" style={{ margin: "10px" }}>
                    <div style={{ float: "left" }}>
                      <img
                        alt="HTML5"
                        style={{ height: "100px" }}
                        src="\images\logotype.png"
                      />
                    </div>
                    <div style={{ float: "left" }}>
                      <h1 style={{ fontSize: "25pt", color: "white" }}>
                        MusON
                      </h1>
                    </div>
                  </div>
                </View>
              </TouchableHighlight>
            </li>
            <li>
              <Link
                style={{
                  color: "white",
                  fontSize: "14pt",
                  margin: "20px",
                  height: "2px",
                }}
                underline="none"
                component="button"
                onClick={() => {
                  collectionOnCLick();
                }}
              >
                <h4>Collection</h4>
              </Link>
            </li>
            <li>
              <Link
                style={{
                  color: "white",
                  fontSize: "14pt",
                  margin: "20px",
                  height: "2px",
                }}
                underline="none"
                component="button"
                onClick={() => {
                  artistsOnCLick();
                }}
              >
                <h4>Artists</h4>
              </Link>
            </li>
            <li>
              <Link
                style={{
                  color: "white",
                  fontSize: "14pt",
                  margin: "20px",
                  height: "2px",
                }}
                underline="none"
                component="button"
                onClick={() => {
                  genresOnCLick();
                }}
              >
                <h4>Genres</h4>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
