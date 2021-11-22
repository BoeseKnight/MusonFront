import * as React from "react";
import SidePane from "./SidePane";
import Button from "@mui/material/Button";
import {AiFillHeart} from "react-icons/ai";
import {IoHeartDislikeSharp} from "react-icons/io5";

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.logoOnCLick = this.logoOnCLick.bind(this);
        this.state = {
            token: this.props.location.state.access_token,
            username: this.props.location.state.username,
            artists: [],
        };
        fetch("http://localhost:8080/api/getLikedArtists?username=" + this.state.username, {
            method: "GET",
            headers: {
                Authorization: this.state.token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data is: " + data);
                this.setState({ artists: data });
                console.log("State is: " + this.state.artist);
            })
            .catch((error) => console.error("Error:", error));
    }
    logoOnCLick() {
        this.props.history.push("MainPage", {
            access_token: this.state.token,
        });
    }
    render() {
        const likeOnClick = (artist, token) => {
            const formData = new FormData();
            formData.append("id", artist.id);
            fetch("http://localhost:8080/api/artist/like", {
                headers: { Authorization: token },
                method: "POST",
                body: formData,
            }).catch((error) => console.error("Error:", error));
        };

        const dislikeOnClick = (artist, token) => {
            const formData = new FormData();
            formData.append("id", artist.id);
            fetch("http://localhost:8080/api/artist/dislike", {
                headers: { Authorization: token },
                method: "POST",
                body: formData,
            }).catch((error) => console.error("Error:", error));
        };
        const onPressImageLiked = (username) => {
            this.props.history.push("LikedSongsPage", {
                access_token: this.state.token,
                username: username,
            });
        };
        const onPressImage = (artistName, username) => {
            this.props.history.push("ArtistPage", {
                access_token: this.state.token,
                artist_name: artistName,
                username: username,
            });
        };
        return (
            <div>
                <div>{SidePane(this.state.token, this.state.username, this.props)}</div>
                <div style={{ display: "flex", marginTop: "50px" }}>
                    <div style={{ marginLeft: "250px" }}>
                        <div style={{ width: "300px", float: "left" }}>
                            <Button
                                sx={{
                                    "&:hover": {
                                        opacity: 0.5,
                                    },
                                }}
                            >
                                <img
                                    onClick={() => {
                                        onPressImageLiked(this.state.username);
                                    }}
                                    alt="HTML5"
                                    style={{ height: "250px", width: "250px" , borderRadius: "10px" }}
                                    src="\images\likeSymbol.jpg"
                                />
                            </Button>
                            <h2
                                style={{
                                    marginBottom: "10px",
                                    marginTop: "0",
                                    marginLeft: "0",
                                    marginRight: "0",
                                }}
                            >
                                Liked songs
                            </h2>
                        </div>
                        {this.state.artists.map((artist) => {
                            return (
                                <div style={{ width: "300px", float: "left" }}>
                                    <Button
                                        sx={{
                                            "&:hover": {
                                                opacity: 0.5,
                                            },
                                        }}
                                    >
                                        <img
                                            onClick={() => {
                                                onPressImage(artist.artist, this.state.username);
                                            }}
                                            alt="HTML5"
                                            style={{ height: "250px", borderRadius: "10px" }}
                                            src={artist.pathToImage}
                                        />
                                    </Button>
                                    <Button
                                        sx={{
                                            "&:hover": {
                                                opacity: 0.5,
                                            },
                                        }}
                                    >
                                        <AiFillHeart
                                            style={{ color: "#7f5af0", fontSize: "28px" }}
                                            onClick={() => likeOnClick(artist, this.state.token)}
                                        />
                                    </Button>
                                    <Button
                                        sx={{
                                            "&:hover": {
                                                opacity: 0.5,
                                            },
                                        }}
                                    >
                                        <IoHeartDislikeSharp
                                            style={{ fontSize: "28px", size: "10", color: "white" }}
                                            onClick={() => dislikeOnClick(artist, this.state.token)}
                                        />
                                    </Button>
                                    <h2
                                        style={{
                                            marginBottom: "10px",
                                            marginTop: "0",
                                            marginLeft: "0",
                                            marginRight: "0",
                                        }}
                                    >
                                        {artist.artist}
                                    </h2>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
