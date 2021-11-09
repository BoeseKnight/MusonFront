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
import { Splitter } from "@progress/kendo-react-layout";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import Link from "@mui/material/Link";
import GenerateListOfSongs from "./ListOfSongs";
import SidePane from "./SidePane";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
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
      pause: false,
      play: true,
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

  logoOnCLick() {
    this.props.history.push("MainPage", {
      access_token: this.state.token,
    });
  }

  render() {
    const audioEl = document.getElementById("audio-element");
    const clickSong = (song) => {
      this.setState({ play: true, pause: false });
      const data = { id: song.id };
      fetch(`http://localhost:8080/stream/${data.id}`, {
        headers: { Authorization: this.state.token },
      })
        .then(function (response) {
          return response;
        })
        .then(async function (outcome) {
          const blob = await outcome.blob();
          const url = window.URL.createObjectURL(blob);
          audioEl.src = url;
          audioEl.play();
        });
      alert("gg");
    };
    const pause = () => {
      if (this.state.pause) {
        audioEl.play();
        this.setState({ play: true, pause: false });
        console.log("click");
        alert("vrode on pause");
      } else {
        this.setState({ play: false, pause: true });
        audioEl.pause();
        console.log("click");
        alert("vrode play");
      }
    };

    const onPressPop = () => {
      this.props.history.push("Pop", {
        access_token: this.state.token,
      });
    };

    const onPressRock = () => {
      this.props.history.push("Rock", {
        access_token: this.state.token,
      });
    };
    const onPressRussianRock = () => {
      this.props.history.push("RussianRock", {
        access_token: this.state.token,
      });
    };

    const onPressRap = () => {
      this.props.history.push("Rap", {
        access_token: this.state.token,
      });
    };
    const click = () => {
      console.log("click");
    };

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
        <div>{SidePane(this.state.token, this.props)}</div>
        <div style={{ display: "flex", marginTop: "100px" }}>
          <div style={{ marginLeft: "250px" }}>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={() => {
                  onPressRap();
                }}
                alt="HTML5"
                style={{ height: "250px", borderRadius: "10px" }}
                src="\images\rap.jpg"
              />
              <div>
                <audio id="audio-element" type="audio/mpeg"></audio>
              </div>
              {/* <Button
                variant="contained"
                size="large"
                onClick={() => {
                  pause();
                }}
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
                onClick={() => {
                  onPressRock();
                }}
                alt="HTML5"
                style={{
                  height: "250px",
                  backgroundColor: "gray",
                  borderRadius: "10px",
                }}
                src="\images\rock.png"
              />

              <h2 style={{ margin: "0" }}>ROCK</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={() => {
                  onPressPop();
                }}
                alt="HTML5"
                style={{ height: "250px", borderRadius: "10px" }}
                src="\images\pop.jpg"
              />

              <h2 style={{ margin: "0" }}>POP</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={() => {
                  onPressRussianRock();
                }}
                alt="HTML5"
                style={{ width: "250px", borderRadius: "10px" }}
                src="\images\rusrock.jpg"
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
        ></div>
        <div>
          {GenerateListOfSongs(
            this.state.songs,
            this.state.token,
            this.state.play,
            this.state.pause
          )}
        </div>
      </div>
    );
  }
}
