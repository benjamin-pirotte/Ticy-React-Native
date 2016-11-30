import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";

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
    checkIfUserData(){
        AsyncStorage.getItem('@User:Credential', function(error, result){
            const user:User = JSON.parse(result)
            if(user && user.Token !== null){

            }else {

            }
        })
    }

    render() {
        return (
            <View>
                <Text>
                    Welcome to React Native
                </Text>
            </View>
        );
    }
}
