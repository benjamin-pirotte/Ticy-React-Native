import React, { Component } from "react"
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native"

//Stores
import UserStore from '../../Stores/User'

//Interfaces
import { User } from '../../Interfaces/User'

//Action
import UserAction from '../../Actions/User'

interface Props {
}

interface State {  

}

export default class LogOut extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    // On submit
    _onLogOut = () => {
        let component = this
        UserAction.logOut()
    }

    render() {
        return (
            <View> 
                <TouchableHighlight onPress={this._onLogOut.bind(this)}>
                    <Text>Log out</Text>
                </TouchableHighlight>

            </View>
        )
    }
} 

