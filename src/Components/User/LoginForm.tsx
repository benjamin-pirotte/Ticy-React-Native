import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native";
import UserStore from '../../Stores/User'
import { User } from '../../Interfaces/User'

interface Props {
    hasBeenDisconnected: Boolean
}

interface State {  
    userEmail : string,
    userPwd : string,
    error: ''
}

export default class LoginForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            userEmail : '',
            userPwd: '',
            error : ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('USER_EMAIL', (err, result) => {
            let state = this.state
            state.userEmail = result      
            this.setState(state)
        })
    }

    componentWillUnmount() {
    }

    // On change
    _onEmailInputChange(value:string):void{
        let state = this.state
        state.userEmail = value.toLowerCase().trim()
        this.setState(state)       
    }

    _onPasswordInputChange(value:string):void{
        let state = this.state
        state.userPwd = value        
        this.setState(state)
    }


    // On submit
    _submitLoginForm():void {
        AsyncStorage.setItem('USER_EMAIL', this.state.userEmail)
        UserStore.loginUser(this.state.userEmail, this.state.userPwd).then(function(reponse){
            console.log(reponse)
        }, function(response){
            console.log(response)
        })
    }

    render() {
        return (
            <View> 
                <Text>Email</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(userEmail) => this._onEmailInputChange(userEmail)}
                    value={this.state.userEmail}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(userPwd) => this._onPasswordInputChange(userPwd)}
                    value={this.state.userPwd}
                    secureTextEntry={true}
                />
                <TouchableHighlight onPress={this._submitLoginForm.bind(this)}>
                    <Text>Log in</Text>
                </TouchableHighlight>

            </View>
        )
    }
} 
