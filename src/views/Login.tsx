import React, { Component } from "react"
import { View, StyleSheet, Text } from "react-native"

//Stores
import UserStore from '../Stores/User'

//Components
import LoginForm from '../Components/User/LoginForm'
 
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

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        let hasBeenDisconnectedMessage:any = null
        if (this.props.hasBeenDisconnected) {
            hasBeenDisconnectedMessage = <Text>You have been disconnected, please connect again</Text>
        }

        return (
            <View> 
                {hasBeenDisconnectedMessage}
                <LoginForm />
            </View>
        )
    }
} 
