import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import UserStore from '../Stores/User'
import { User } from '../Interfaces/User'

import LoginForm from '../Components/User/LoginForm'
 

interface Props {
    hasBeenDisconnected: Boolean
}

interface State {  

}

export default class Login extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <View> 
                <LoginForm />
            </View>
        )
    }
} 
