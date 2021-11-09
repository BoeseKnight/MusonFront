import Button from "@mui/material/Button";
import {Text, TouchableHighlight, View} from "react-native";
import * as React from "react";
import Link from "@mui/material/Link";

const clickSong = (song, token) => {
    const audioEl = document.getElementById("audio-element");
    const data = { songName: song.id };
    fetch(`http://localhost:8080/stream/${data.songName}`, {
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
}

const likeOnClick = (song, token)=>{
    const formData = new FormData();
    formData.append("id", song.id);
    fetch("http://localhost:8080/api/song/like", {
        headers: { Authorization: token },
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {console.log("Data is: " + data.access_token);})
        .catch(error => console.error('Error:', error));
}

const dislikeOnClick = (song, token)=>{
    const formData = new FormData();
    formData.append("id", song.id);
    fetch("http://localhost:8080/api/song/dislike", {
        headers: { Authorization: token },
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data =>
        {console.log("Data is: " + data.access_token);})
        .catch(error => console.error('Error:', error));
}

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
                        //   background: "#16161a",
                        width: 400,
                    }}
                    onClick={() => clickSong(song, token)}
                >
                    <Text>
                        <Text style={{color: "#D9D9D8", fontSize: 16}}>
                            {index + 1}. {song.song.substring(4, song.song.length - 4)}
                        </Text>
                        <Text style={{color: "#8B8B8C", fontSize: 14}}>
                            {"\n"}
                            {song.artist}
                        </Text>
                    </Text>
                </Button>
                <div style={{width: "50px", float: "left"}}>
                    <img
                        onClick={() => likeOnClick(song, token)}
                        alt="HTML5"
                        style={{
                            height: "30px",
                            backgroundColor: "gray",
                            borderRadius: "10px",
                        }}
                        src="\images\likeSymbol.png"
                    />
                </div>
                <div style={{width: "50px", float: "left"}}>
                    <img
                        onClick={() => dislikeOnClick(song, token)}
                        alt="HTML5"
                        style={{
                            height: "30px",
                            backgroundColor: "gray",
                            borderRadius: "10px",
                        }}
                        src="\images\dislikeSymbol.png"
                    />
                </div>
                <div>
                    <audio id="audio-element" type="audio/mpeg"></audio>
                </div>
            </div>
        );
    });
}

