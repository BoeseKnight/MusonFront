import "./App.css";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Greeting from "./components/Greeting";
import MainPage from "./components/MainPage";
import Artists from "./components/Artists";
import Genres from "./components/Genres";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ReactDOM } from "react";
import { useState } from "react";
import Collection from "./components/Collection";
import ArtistPage from "./components/ArtistPage";
import GenrePage from "./components/GenrePage";
import Rock from "./components/Rock";
import Pop from "./components/Pop";
import Rap from "./components/Rap";
import RussianRock from "./components/RussianRock";
import Search from "./components/Search";
import RecommendedPlaylist from "./components/RecommendedPlaylist";
import LikedSongsPage from "./components/LikedSongsPage";

function App() {
  const [token, setToken] = useState("");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Greeting} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/mainpage" component={MainPage} />
          <Route path="/artists" component={Artists} />
          <Route path="/genres" component={Genres} />
          <Route path="/collection" component={Collection} />
          <Route path="/artistPage" component={ArtistPage} />
          <Route path="/genrePage" component={GenrePage} />
          <Route path="/rock" component={Rock} />
          <Route path="/pop" component={Pop} />
          <Route path="/rap" component={Rap} />
          <Route path="/russianRock" component={RussianRock} />
          <Route path="/recommendedPlaylist" component={RecommendedPlaylist} />
          <Route path="/search" component={Search} />
          <Route path="/likedSongsPage" component={LikedSongsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
