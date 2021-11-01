import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import {width} from "@mui/system";
import SplitPane from "react-split-pane";
import { Splitter } from "@progress/kendo-react-layout";
import Pane from "./Pane";
// import Helmet from 'react-helmet';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={token: this.props.location.state.access_token, buttonsList: []};
        var Song = {id:0, song: "", artist: "", directory: "", genre:""};
        const headers = {'Authorization': this.state.token};
        this.boxRef = React.createRef();
        var buttonStyle = {
            margin: '10px 10px 10px 0'
        };
        fetch('http://localhost:8080/showAllSongs', {headers})
            .then(response=>response.json())
            .then(data=>{this.setState({ buttonsList: data }, () => {
                console.log(this.state.buttonsList);
            });
            })
    }
    componentDidMount() {
        if (this.props.active) { // whatever your test might be
            this.boxRef.current.scrollIntoView();
        }
    }
    render() {
        //console.log(this.state.buttonsList)
        const click = (song)=>{
            console.log(song.song);
        }

        return (
        <div>
            <SplitPane split='vertical' minSize={500} defaultSize={500}>
                <Pane style={{width: 300, height: 500}}>
                    Shit
                </Pane>
                <SplitPane split='horizontal' minSize={500} defaultSize={100}>
                    <Pane>
                        Tracks
                    </Pane>
                    <Pane style={{width: 500, height: 500, overflowY: 'scroll'}} ref={this.boxRef}>
                        {this.state.buttonsList.map(song=>{
                            return(
                                <div>
                                    <Button
                                        onClick = {() => {click(song)}}>
                                        {song.song}
                                    </Button>
                                </div>
                            )
                            })}
                    </Pane>
                </SplitPane>
            </SplitPane>
        </div>

        );
    }
};
