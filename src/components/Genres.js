import * as React from "react";
import SidePane from "./SidePane";
import Button from "@mui/material/Button";

export default class Genres extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = {
      token: this.props.location.state.access_token,
      username: this.props.location.state.username,
      genres: [],
    };
    fetch("http://localhost:8080/api/getAllGenres", {
      method: "GET",
      headers: {
        Authorization: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data is: " + data);
        this.setState({ genres: data });
      })
      .catch((error) => console.error("Error:", error));
  }
  logoOnCLick() {
    this.props.history.push("MainPage", {
      access_token: this.state.token,
    });
  }
  render() {
    const onPressImage = (genreName, username) => {
      this.props.history.push("GenrePage", {
        access_token: this.state.token,
        genre_name: genreName,
        username: username,
      });
    };
    return (
      <div>
        <div>{SidePane(this.state.token, this.state.username, this.props)}</div>
        <div style={{ display: "flex", marginTop: "50px" }}>
          <div style={{ marginLeft: "250px" }}>
            {this.state.genres.map((genre) => {
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
                        onPressImage(genre.genre, this.state.username);
                      }}
                      alt="HTML5"
                      style={{ height: "250px", borderRadius: "10px" }}
                      src={genre.pathToImage}
                    />
                  </Button>
                  {console.log(genre.pathToImage)}
                  <h2
                    style={{
                      marginBottom: "10px",
                      marginTop: "0",
                      marginLeft: "0",
                      marginRight: "0",
                    }}
                  >
                    {genre.genre}
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
