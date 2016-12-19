import React, { Component } from "react"
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native"

//Stores
import UserStore from '../../Stores/User'

//Interfaces
import { User } from '../../Interfaces/User'


interface Props {
}

interface State {  

}

export default class LogOut extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // On submit
    _onLogOut():void {
        let component = this
        UserStore.logOut()
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

