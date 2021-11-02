import * as React from "react";
import Button from "@mui/material/Button";
import {Text} from "react-native";
import SplitPane from "react-split-pane";
import Pane from "./Pane";

export default class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {token: this.props.location.state.access_token};
    }
    render () {
        return (
            <div style={{height: 1000, background: '#303035'}}>
                Collection
            </div>
        );
    }
}