import React, { Component } from "react"
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native"

//Stores
import UserStore from '../../Stores/User'

//Action
import UserAction from '../../Actions/User'

// Services
import i18n from '../../Services/i18n'

//Interfaces
import { User } from '../../Interfaces/User'

interface Props {
}

interface State {  

}

//Component
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
                <TouchableHighlight onPress={() => this._onLogOut()}>
                    <Text>{i18n.t('USER.LOG_OUT')}</Text>
                </TouchableHighlight>

            </View>
        )
    }
} 

