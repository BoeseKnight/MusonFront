import { TouchableHighlight, View } from "react-native";
import Link from "@mui/material/Link";
import * as React from "react";

const logoOnCLick = (token, props, username) => {
  props.history.push("MainPage", {
    access_token: token,
    username: username,
  });
};

const genresOnCLick = (token, props, username) => {
  props.history.push("Genres", {
    access_token: token,
    username: username,
  });
};

const collectionOnCLick = (token, props, username) => {
  props.history.push("Collection", {
    access_token: token,
    username: username,
  });
};

const artistsOnCLick = (token, props, username) => {
  props.history.push("Artists", {
    access_token: token,
    username: username,
  });
};

const searchOnCLick = (token, props, username) => {
  props.history.push("Search", {
    access_token: token,
    username: username,
  });
};

const recsOnCLick = (token, props, username) => {
  props.history.push("RecommendedPlaylist", {
    access_token: token,
    username: username,
  });
};

export default function sidePane(token, username, props) {
  return (
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
          <TouchableHighlight
            activeOpacity={1}
            onPress={() => logoOnCLick(token, props, username)}
          >
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
                  <h1 style={{ fontSize: "25pt", color: "white" }}>MusON</h1>
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
            sx={{
              "&:hover": {
                opacity: 0.5,
              },
            }}
            underline="none"
            component="button"
            onClick={() => {
              collectionOnCLick(token, props, username);
              console.log(username);
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
            sx={{
              "&:hover": {
                opacity: 0.5,
              },
            }}
            underline="none"
            component="button"
            onClick={() => {
              artistsOnCLick(token, props, username);
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
            sx={{
              "&:hover": {
                opacity: 0.5,
              },
            }}
            underline="none"
            component="button"
            onClick={() => {
              genresOnCLick(token, props, username);
            }}
          >
            <h4>Genres</h4>
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
            sx={{
              "&:hover": {
                opacity: 0.5,
              },
            }}
            underline="none"
            component="button"
            onClick={() => {
              recsOnCLick(token, props, username);
            }}
          >
            <h4>Recommended Playlist</h4>
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
            sx={{
              "&:hover": {
                opacity: 0.5,
              },
            }}
            underline="none"
            component="button"
            onClick={() => {
              searchOnCLick(token, props, username);
            }}
          >
            <h4>Search</h4>
          </Link>
        </li>
      </ul>
    </div>
  );
}
