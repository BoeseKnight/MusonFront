import * as React from "react";
import Button from "@mui/material/Button";
import { Text } from "react-native";
import Link from "@mui/material/Link";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import SidePane from "./SidePane"

export default class Genres extends React.Component {
    constructor(props) {
        super(props);
        this.logoOnCLick = this.logoOnCLick.bind(this)
        this.state = { token: this.props.location.state.access_token, genres: [] };
        fetch("http://localhost:8080/api/getAllGenres", {
            method: "GET",
            headers: {
                Authorization: this.state.token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data is: " + data);
                //this.state.genres.push(genre);
                this.setState({ genres: data });
            })
            .catch((error) => console.error("Error:", error));
    }
    logoOnCLick () {
        this.props.history.push('MainPage', {
            access_token: this.state.token,
        });
    };
    render() {
        const onPressImage = (genreName) => {
            this.props.history.push("GenrePage", {
                access_token: this.state.token,
                genre_name: genreName,
            });
        };
        return (
            <div>
                <div>
                    {SidePane(this.state.token, this.props)}
                </div>
                <div style={{ display: "flex", marginTop: "100px" }}>
                    <div style={{ marginLeft: "250px" }}>
                        {this.state.genres.map((genre) => {
                            return (
                                <div style={{ width: "300px", float: "left" }}>
                                    <img
                                        onClick={() => {
                                            onPressImage(genre.genre);
                                        }}
                                        alt="HTML5"
                                        style={{ height: "250px", borderRadius: "10px" }}
                                        src={genre.pathToImage}
                                    />
                                    <h2 style={{ margin: "0" }}>{genre.genre}</h2>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
