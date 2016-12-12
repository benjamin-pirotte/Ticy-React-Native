import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import Home from "./views/Home";

interface Props {

}

interface State {

}

export default class App extends Component<Props, State> {
    render() { 
        return (
            <View>
                <Home /> 
            </View>
        );
    }
}
