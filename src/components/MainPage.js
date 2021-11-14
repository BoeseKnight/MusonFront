import * as React from "react";
import GenerateListOfSongs from "./ListOfSongs";
import SidePane from "./SidePane";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.logoOnCLick = this.logoOnCLick.bind(this);
    this.state = {
      token: this.props.location.state.access_token,
      username: this.props.location.state.username,
      songs: [],
      isChart: false,
      isAll: true,
      pause: false,
      play: true,
    };
    console.log(this.state.username);
    const headers = { Authorization: this.state.token };
    this.boxRef = React.createRef();
    fetch("http://localhost:8080/showAllSongs", { headers })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ songs: data }, () => {
          console.log(this.state.songs);
        });
      });
  }

  componentDidMount() {
    if (this.props.active) {
      this.boxRef.current.scrollIntoView();
    }
  }

  logoOnCLick() {
    this.props.history.push("MainPage", {
      access_token: this.state.token,
    });
  }

  render() {
    const onPressPop = () => {
      this.props.history.push("Pop", {
        access_token: this.state.token,
        username: this.state.username,
      });
    };

    const onPressRock = () => {
      this.props.history.push("Rock", {
        access_token: this.state.token,
        username: this.state.username,
      });
    };

    const onPressRussianRock = () => {
      this.props.history.push("RussianRock", {
        access_token: this.state.token,
        username: this.state.username,
      });
    };

    const onPressRap = () => {
      this.props.history.push("Rap", {
        access_token: this.state.token,
        username: this.state.username,
      });
    };

    return (
      <div style={{ marginBottom: "100px" }}>
        <div>{SidePane(this.state.token, this.state.username, this.props)}</div>

        <div style={{ display: "flex", marginTop: "100px" }}>
          <div style={{ marginLeft: "250px" }}>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={() => {
                  onPressRap();
                }}
                alt="HTML5"
                style={{ height: "250px", borderRadius: "10px" }}
                src="\images\rap.jpg"
              />
              <h2 style={{ margin: "0" }}>RAP</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={() => {
                  onPressRock();
                }}
                alt="HTML5"
                style={{
                  height: "250px",
                  backgroundColor: "gray",
                  borderRadius: "10px",
                }}
                src="\images\rock.png"
              />

              <h2 style={{ margin: "0" }}>ROCK</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={() => {
                  onPressPop();
                }}
                alt="HTML5"
                style={{ height: "250px", borderRadius: "10px" }}
                src="\images\pop.jpg"
              />

              <h2 style={{ margin: "0" }}>POP</h2>
            </div>
            <div style={{ width: "300px", float: "left" }}>
              <img
                onClick={() => {
                  onPressRussianRock();
                }}
                alt="HTML5"
                style={{ width: "250px", borderRadius: "10px" }}
                src="\images\rusrock.jpg"
              />
              <h2 style={{ margin: "0" }}>RUSSIAN ROCK</h2>
            </div>
          </div>
        </div>

        <div>{GenerateListOfSongs(this.state.songs, this.state.token)}</div>
        <div
          style={{
            position: "fixed",
            marginLeft: "250px",
            padding: "5px",
            backgroundColor: "#111113",
            // margin: "10px",
            display: "block",
            overflow: "hidden",
            // width: "100%",
            bottom: "0",
            left: 0.5,
            right: 0.5,
            // right: "0",
          }}
        >
          <audio
            style={{ width: "600px" }}
            controls
            id="audio-element"
            type="audio/mpeg"
          ></audio>
        </div>
      </div>
    );
  }
}
