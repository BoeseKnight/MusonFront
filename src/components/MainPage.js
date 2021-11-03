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
import { width } from "@mui/system";
import SplitPane from "react-split-pane";
import { Splitter } from "@progress/kendo-react-layout";
import { Text } from "react-native";
import Pane from "./Pane";
import Link from '@mui/material/Link';
// import Helmet from 'react-helmet';

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
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
      // whatever your test might be
      this.boxRef.current.scrollIntoView();
    }
  }
  render() {

    const clickSong = (song) => {
      console.log(song.song);
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
                justifyContent: "left",
                alignItems: "left",
                display: "flex",
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
                  background: "#323152",
                  width: 500,
                }}
                onClick={() => {
                  clickSong(song);
                }}
              >
                <Text>
                  <Text style={{ color: "#bebec4", fontSize: 16 }}>
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
          
        <SplitPane
          split="vertical"
          minSize={500}
          defaultSize={500}
          style={{ background: "black" }}
        >
          <Pane
            style={{
              width: 300,
              height: 500,
              justifyContent: "left",
              alignItems: "left",
              display: "flex",
              whiteSpace: "pre-line",
            }}
          >
            <div
              style={{
                justifyContent: "left",
                alignItems: "left",
                display: "flex",
              }}
            >
              <ul style={{ listStyleType: "none", marginTop: "0px", padding: "0px", textAlign:"left" }}>
                <li>
                <Link style={{color: "white", fontSize:"14pt", padding: "20px" }} underline="none"
                    component="button"
                    onClick={() => {
                      collectionOnCLick();
                    }}
                  >
                    Collection
                  </Link>
                </li>
                <li>
                  <Link style={{color: "white", fontSize:"14pt", padding: "20px" }} underline="none"
                    component="button"
                    onClick={() => {
                      artistsOnCLick();
                    }}
                  >
                    Artists
                  </Link>
                </li>
                <li>
                <Link style={{color: "white", fontSize:"14pt", padding: "20px" }} underline="none"
                    component="button"
                    onClick={() => {
                      genresOnCLick();
                    }}
                  >
                    Genres
                  </Link>
                </li>
              </ul>
            </div>
          </Pane>
          <SplitPane split="horizontal" minSize={500} defaultSize={100}>
            <Pane style={{ width: 100, height: 200 }}>
              <div style={{ justifyContent: "left", display: "flex" }}>
                <button
                  style={{ width: 100, height: 30, background: "#fea900" }}
                  onClick={() => {
                    chartOnClick();
                  }}
                >
                  Chart
                </button>
                <button
                  style={{ width: 100, height: 30, background: "#fea900" }}
                  onClick={() => {
                    allOnClick();
                  }}
                >
                  All
                </button>
              </div>
            </Pane>
            <Pane
              style={{ width: 500, height: 500, overflowY: "scroll" }}
              ref={this.boxRef}
            >
              {chart()}
              {all()}
            </Pane>
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}
