import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import Main from "./views/Main";

interface Props {

}


export default class App extends Component<Props, {}> {
    render() {
        return (
            <View style={{flex: 1}}>
                <Main /> 
            </View>  
        )
    }
}
