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
import axios from "axios";
import { borderRadius, getContrastRatio, width } from "@mui/system";
import SplitPane from "react-split-pane";
import { Splitter } from "@progress/kendo-react-layout";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Link from "@mui/material/Link";
import GenerateListOfSongs from "./ListOfSongs";
import SidePane from "./SidePane"
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import Helmet from 'react-helmet';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = {
      token: this.props.location.state.access_token,
      songs: [],
      isChart: false,
      isAll: true,
    };
    const headers = { Authorization: this.state.token };
    this.boxRef = React.createRef();
    fetch("http://localhost:8080/showAllSongs", { headers })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ songs: data }, () => {
          console.log(this.state.songs);
        });
      });
  }
  componentDidMount() {
    if (this.props.active) {
      this.boxRef.current.scrollIntoView();
    }
  }
  onPressImage() {
    alert("You tapped the button!");
  }

  logoOnCLick() {
    this.props.history.push("MainPage", {
      access_token: this.state.token,
    });
  }

  //   pause(){
  // 	  audioEl.pause();
  // 	}
  render() {
    const playAudio = () => {
      document.getElementsByClassName("audio-element").play();
    };

    const chartOnClick = () => {
      this.setState({ isChart: true, isAll: false });
      console.log(this.state.isChart);
    };

    const allOnClick = () => {
      this.setState({ isChart: false, isAll: true });
      console.log(this.state.isAll);
    };

    const all = () => {
      if (this.state.isAll) {
        return <div>All</div>;
      }
    };

    return (
      <div>
        <div>
            {SidePane(this.state.token, this.props)}
        </div>
        <div style={{ display: "flex", marginTop: "100px" }}>
          <div style={{ marginLeft: "250px" }}>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={this.onPressImage}
                alt="HTML5"
                style={{ height: "250px", borderRadius: "10px" }}
                src="/images/DkG03zyV4AAFpXO.jpg"
              />
              <div>
                <audio id="audio-element" type="audio/mpeg"></audio>
              </div>
              {/* <Button
                variant="contained"
                size="large"
                onClick={this.pause}
                style={{
                  width: "200px",
                  backgroundColor: "#7f5af0",
                  padding: 0,
                }}
              >
                <h3>PAUSE</h3>
              </Button> */}
              {/* <AudioPlayer
                autoPlay
                src="http://localhost:8080/stream/NothingButThieves-FreeIfWeWantIt.mp3"
                onPlay={(e) => console.log("onPlay")}
                // other props here
              /> */}
              <h2 style={{ margin: "0" }}>RAP</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={this.onPressImage}
                alt="HTML5"
                style={{
                  height: "250px",
                  backgroundColor: "gray",
                  borderRadius: "10px",
                }}
                src="\images\linkin-park-logo.png"
              />

              <h2 style={{ margin: "0" }}>ROCK</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={this.onPressImage}
                alt="HTML5"
                style={{ height: "250px", borderRadius: "10px" }}
                src="\images\hehe.jpg"
              />

              <h2 style={{ margin: "0" }}>POP</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={this.onPressImage}
                alt="HTML5"
                style={{ width: "250px", borderRadius: "10px" }}
                src="\images\pic.jpg"
              />
              <h2 style={{ margin: "0" }}>RUSSIAN ROCK</h2>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "250px",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={chartOnClick}
            style={{ width: "200px", backgroundColor: "#7f5af0", padding: 0 }}
          >
            <h3>Chart</h3>
          </Button>
        </div>
        <div>
            {GenerateListOfSongs(this.state.songs, this.state.token)}
        </div>
      </div>
    );
  }
}
