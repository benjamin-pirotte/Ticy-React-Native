import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native";

//Stores
import UserStore from '../../Stores/User'

//Interfaces
import { User } from '../../Interfaces/User'

interface Props {
}

interface State {  
    email?: string
    password?: string
    error?: string
}

export default class LoginForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        AsyncStorage.getItem('USER_EMAIL', (err, result) => {
            let state = this.state
            state.email = result      
            this.setState(state)
        })
    }

    componentWillUnmount() {
    }

    // On change
    _onEmailInputChange = (value:string) => {
        let state = this.state
        state.email = value.toLowerCase().trim()
        this.setState(state)       
    }

    _onPasswordInputChange = (value:string) => {
        let state = this.state
        state.password = value        
        this.setState(state)
    }


    // On submit
    _submitForm():void {
        let component = this

        AsyncStorage.setItem('USER_EMAIL', this.state.email)
        UserStore.loginUser(this.state.email, this.state.password).then(function(response){
            // Store emit change
        }, function(response){
            let state = component.state
            state.error = response['message']        
            component.setState(state)
        })
    }

    render() {
        return (
            <View> 
                <Text>Email</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(email) => this._onEmailInputChange(email)}
                    value={this.state.email}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(password) => this._onPasswordInputChange(password)}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text>{this.state.error}</Text>
                <TouchableHighlight onPress={this._submitForm.bind(this)}>
                    <Text>Log in</Text>
                </TouchableHighlight>

            </View>
        )
    }
} 
