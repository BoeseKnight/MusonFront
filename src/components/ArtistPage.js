import * as React from "react";
import Button from "@mui/material/Button";
import {Text} from "react-native";
import SplitPane from "react-split-pane";
import Pane from "./Pane";
import GenerateListOfSongs from "./CommonComponents"
import Link from "@mui/material/Link";

export default class ArtistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {token: this.props.location.state.access_token, artistName: this.props.location.state.artist_name, songs: []};
        fetch("http://localhost:8080/api/getArtistsSongs?artist=" + this.state.artistName, {
            method: "GET",
            headers: {
                'Authorization' : this.state.token
            }
        })
            .then(response => response.json())
            .then(data =>
            {
                this.setState({songs: data})
            })
            .catch(error => console.error('Error:', error));
    }
    render () {
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
        return (
            <div>
                <div
                    style={{
                        height: "100%",
                        position: "fixed",
                        backgroundColor:"#010101",
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
                <div>
                    {this.state.songs.map(GenerateListOfSongs)}
                </div>
            </div>
        );
    }
}