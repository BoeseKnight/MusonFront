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
import Pane from "./Pane";
import Link from "@mui/material/Link";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
// import Helmet from 'react-helmet';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = {
      token: this.props.location.state.access_token,
      buttonsList: [],
      isChart: false,
      isAll: true,
    };
    var Song = { id: 0, song: "", artist: "", directory: "", genre: "" };
    const headers = { Authorization: this.state.token };
    this.boxRef = React.createRef();
    var buttonStyle = {
      margin: "10px 10px 10px 0",
    };
    fetch("http://localhost:8080/showAllSongs", { headers })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ buttonsList: data }, () => {
          console.log(this.state.buttonsList);
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

  // clickSong(song) {
  // const audioEl = document.getElementById("audio-element");
  // const data = { songName: song.id };
  // fetch(`http://localhost:8080/stream/${data.songName}`, {
  //   headers: { Authorization: this.state.token },
  // })
  //   .then(function (response) {
  //     return response;
  //   })
  //   .then(async function (outcome) {
  //     const blob = await outcome.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     audioEl.src = url;
  //     audioEl.play();
  //   });
  //   alert("gg");
  // }
  //   pause(){
  // 	  audioEl.pause();
  // 	}
  render() {
    const clickSong = (song) => {
      const audioEl = document.getElementById("audio-element");
      const data = { songName: song.id };
      fetch(`http://localhost:8080/stream/${data.songName}`, {
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

    const chart = () => {
      if (this.state.isChart) {
        return this.state.buttonsList.map((song) => {
          return (
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginLeft: "250px",
              }}
            >
              <Button
                style={{
                  whiteSpace: "pre-line",
                  textAlign: "left",
                  textTransform: "none",
                  justifyContent: "left",
                  alignItems: "left",
                  color: "#bebec4",
                  //   background: "#16161a",
                  width: 500,
                }}
                onClick={() => {
                  clickSong(song);
                }}
              >
                <Text>
                  <Text style={{ color: "#D9D9D8", fontSize: 16 }}>
                    {song.song}
                  </Text>
                  <Text style={{ color: "#8B8B8C", fontSize: 14 }}>
                    {"\n"}
                    {song.artist}
                  </Text>
                </Text>
              </Button>
            </div>
          );
        });
      }
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
          {/* {chart()}
              {all()} */}
          {chart()}
        </div>
      </div>
    );
  }
}
