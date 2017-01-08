import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text } from "react-native"

//Stores
import UserStore from '../Stores/User'

//Components
import LoginForm from '../Components/User/LoginForm'
import RegisterForm from '../Components/User/RegisterForm'
 
//Interfaces
import { User } from '../Interfaces/User'

interface Props {
    hasBeenDisconnected: Boolean
}

interface State {  

}

export default class Login extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    render() {
        let hasBeenDisconnectedMessage:any = null
        if (this.props.hasBeenDisconnected) {
            hasBeenDisconnectedMessage = <Text>You have been disconnected, please connect again</Text>
        }

        return (
            <View>
                <ScrollView style={scrollViewStyle}> 
                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>Login</Text>
                    {hasBeenDisconnectedMessage}
                    <LoginForm />
                    <Text style={{fontWeight: 'bold', marginTop: 20, marginBottom: 10}}>Register</Text>
                    <RegisterForm />
                </ScrollView>
            </View>
        )
    }
} 


var scrollViewStyle = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
}