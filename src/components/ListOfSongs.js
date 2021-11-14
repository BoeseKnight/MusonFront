import Button from "@mui/material/Button";
import { Text, TouchableHighlight, View } from "react-native";
import * as React from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoHeartDislikeSharp } from "react-icons/io5";

const clickSong = (song, token) => {
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
  }).catch((error) => console.error("Error:", error));
};

const dislikeOnClick = (song, token) => {
  const formData = new FormData();
  formData.append("id", song.id);
  fetch("http://localhost:8080/api/song/dislike", {
    headers: { Authorization: token },
    method: "POST",
    body: formData,
  }).catch((error) => console.error("Error:", error));
};

export default function GenerateListOfSongs(songs, token) {
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
        <Button
          style={{
            whiteSpace: "pre-line",
            textAlign: "left",
            textTransform: "none",
            justifyContent: "left",
            alignItems: "left",
            color: "#bebec4",
            width: 500,
          }}
          onClick={() => clickSong(song, token)}
        >
          <Text>
            <Text style={{ color: "#D9D9D8", fontSize: 16 }}>{song.song}</Text>
            <Text style={{ color: "#8B8B8C", fontSize: 14 }}>
              {"\n"}
              {song.artist}
            </Text>
          </Text>
        </Button>

        <AiFillHeart
          style={{ color: "#7f5af0", fontSize: "28px" }}
          onClick={() => likeOnClick(song, token)}
        />
        <IoHeartDislikeSharp
          style={{ fontSize: "28px", marginLeft: "10px" }}
          onClick={() => dislikeOnClick(song, token)}
        />
        {/* <div>
          <audio id="audio-element" type="audio/mpeg"></audio>
        </div> */}
      </div>
    );
  });
}
