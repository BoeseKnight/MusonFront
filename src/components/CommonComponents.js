import Button from "@mui/material/Button";
import {Text} from "react-native";
import * as React from "react";

const clickSong = (song) => {
    console.log(song.song);
};
export default function GenerateListOfSongs(song, index) {
    return (
        <div
            style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                marginLeft: "250px"
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
                    background: "#16161a",
                    width: 500,
                }}
                onClick={() => {
                    clickSong(song);
                }}
            >
                <Text>
                    <Text style={{color: "#D9D9D8", fontSize: 16}}>
                        {(index + 1).toString() + ". " + song.song.substring(3, song.song.length - 4)}
                    </Text>
                    <Text style={{color: "#8B8B8C", fontSize: 14}}>
                        {"\n"}
                        {song.artist}
                    </Text>
                </Text>
            </Button>
        </div>
    );
}