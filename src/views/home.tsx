import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {

}

interface State {

}

interface User {
    UserName:String
    Id:number,
    Token:String
}

export default class Main extends Component<Props, State> {
    render() {
        return (
            <View>
                <Text>
                    Welcome to React Native
                </Text>
            </View>
        )
    }
}
