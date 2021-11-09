import Button from "@mui/material/Button";
import { Text, TouchableHighlight, View } from "react-native";
import * as React from "react";
import Link from "@mui/material/Link";
import FavoriteIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { pink } from "@mui/material/colors";
import { AiFillHeart } from "react-icons/ai";

const clickSong = (song, token, play, pause) => {
  play = true;
  pause = false;
  const audioEl = document.getElementById("audio-element");
  const data = { id: song.id };
  fetch(`http://localhost:8080/stream/${data.id}`, {
    headers: { Authorization: token },
  })
    .then(function (response) {
      return response;
    })
    .then(async function (outcome) {
      const blob = await outcome.blob();
      const url = window.URL.createObjectURL(blob);
      console.log("audioEl: ");
      console.log(audioEl);
      audioEl.src = url;
      audioEl.play();
    });
};

const likeOnClick = (song, token) => {
  const formData = new FormData();
  formData.append("id", song.id);
  fetch("http://localhost:8080/api/song/like", {
    headers: { Authorization: token },
    method: "POST",
    body: formData,
  })
      .catch((error) => console.error("Error:", error));
};

const dislikeOnClick = (song, token) => {
  const formData = new FormData();
  formData.append("id", song.id);
  fetch("http://localhost:8080/api/song/dislike", {
    headers: { Authorization: token },
    method: "POST",
    body: formData,
  })
    .catch((error) => console.error("Error:", error));
};

export default function GenerateListOfSongs(songs, token, play, pause) {
  return songs.map((song, index) => {
    return (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginLeft: "250px",
        }}
      >
        {/* <PlayArrowIcon /> */}
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
          onClick={() => clickSong(song, token, play, pause)}
        >
          <Text>
            <Text style={{ color: "#D9D9D8", fontSize: 16 }}>{song.song}</Text>
            <Text style={{ color: "#8B8B8C", fontSize: 14 }}>
              {"\n"}
              {song.artist}
            </Text>
          </Text>
        </Button>

        <AiFillHeart style={{ color: "#7f5af0", fontSize: "28px" }}
        onClick={() => likeOnClick(song,token)}/>
        {/* onClick={() => dislikeOnClick(song, token)} */}
        <div>
          <audio id="audio-element" type="audio/mpeg"></audio>
        </div>
      </div>
    );
  });
}
