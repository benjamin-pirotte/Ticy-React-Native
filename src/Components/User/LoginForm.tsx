import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native";

//Stores
import UserStore from '../../Stores/User'

//Stores
import UserAction from '../../Actions/User'

//Interfaces
import { User } from '../../Interfaces/User'
import { Action } from '../../Interfaces/Dispatcher'

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

    componentDidMount = () => {
        AsyncStorage.getItem('USER_EMAIL', (err, result) => {
            this.setState({
                email: result.toLowerCase().trim()
            })   
        })
    }

    componentWillUnmount = () => {
        UserStore.removeErrorListener(this._onFormError.bind(this))
    }

    // On change
    _onEmailInputChange = (value:string) => {
        this.setState({
            email: value.toLowerCase().trim()
        })       
    }

    _onPasswordInputChange = (value:string) => {
        this.setState({
            password: value
        }) 
    }

    // On form error
    _onFormError = (action:Action) => {
        console.log(action.type)
    }

    // On submit
    _submitForm = () => {
        UserStore.addErrorListener(this._onFormError.bind(this))
        AsyncStorage.setItem('USER_EMAIL', this.state.email)
        UserAction.login(this.state.email, this.state.password)
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
