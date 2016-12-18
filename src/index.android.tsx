import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import Main from "./views/Main";

interface Props {

}

interface State {

}

export default class App extends Component<Props, State> {
    render() { 
        return (
            <View>
                <Main /> 
            </View>  
        )
    }
}
