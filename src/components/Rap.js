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
      buttonsList: [],
      isChart: false,
      isAll: true,
      pause: true,
      play: false,
    };
    var Song = { id: 0, song: "", artist: "", directory: "", genre: "" };
    const headers = { Authorization: this.state.token };
    this.boxRef = React.createRef();
    var buttonStyle = {
      margin: "10px 10px 10px 0",
    };
    fetch("http://localhost:8080/api/getAllByGenre?genre=rap", {
      method: "GET",
      headers: {
        Authorization: this.state.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ buttonsList: data }, () => {
          console.log(this.state.buttonsList);
        });
      });
  }
  componentDidMount() {
    if (this.props.active) {
      this.boxRef.current.scrollIntoView();
    }
  }
  onPressImage() {
    alert("You tapped the button!");
  }

  logoOnCLick() {
    this.props.history.push("MainPage", {
      access_token: this.state.token,
    });
  }

  render() {
    return (
      <div>
        <div>{SidePane(this.state.token, this.state.username, this.props)}</div>
        <div style={{ display: "flex", marginTop: "100px" }}>
          <div style={{ marginLeft: "250px" }}>
            <div style={{ width: "300px", float: "left" }}></div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "250px",
            justifyContent: "center",
            marginTop: "50px",
          }}
        ></div>
        <div>
          {GenerateListOfSongs(this.state.buttonsList, this.state.token)}
        </div>
        <div
          style={{
            position: "fixed",
            marginLeft: "250px",
            padding: "5px",
            backgroundColor: "#111113",

            display: "block",
            overflow: "hidden",

            bottom: "0",
            left: 0.5,
            right: 0.5,
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
