import React, { Component } from "react";

//Stores
import UserStore from '../../Stores/User'
import UserAction from '../../Actions/User'

//Components
import {View, StyleSheet, TextInput, Text, TouchableHighlight} from "react-native";

//Interfaces
import { NewUser } from '../../Interfaces/User'
import { HttpError } from '../../Interfaces/HttpError'

interface Props {
}

interface State  {
    error?:string
    user?: NewUser
}

export default class RegisterForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            user: {}
        }
    }

    componentDidMount = () => {
        UserStore.addErrorListener(this._onFormError.bind(this))
    }

    componentWillUnmount = () => {
        UserStore.removeErrorListener(this._onFormError.bind(this))
    }

    // On change
    _onEmailInputChange = (value:string) =>{
        let user = this.state.user
        user.email = value.toLowerCase().trim()
        this.setState({
            user: user
        })   
    }

    _onPasswordInputChange = (value:string) => {
        let user = this.state.user
        user.password = value
        this.setState({
            user: user
        })   
    }

    _onFirstNameInputChange = (value:string) => {
        let user = this.state.user
        user.firstName = value
        this.setState({
            user: user
        })       
    }

    _onLastNameInputChange = (value:string) => {
        let user = this.state.user
        user.lastName = value
        this.setState({
            user: user
        })   
    }

    _onAgeInputChange = (value:string) => {
        let user = this.state.user
        user.age = parseInt(value)
        this.setState({
            user: user
        })   
    }

    // On form error
    _onFormError = (type:string, message:string) => {
    }

    // On submit
    _submitForm = () => {
        UserStore.addErrorListener(this._onFormError.bind(this))

        let user = this.state.user
        let newUser:NewUser = {
            email: user.email, 
            password: user.password, 
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age
        }
        UserAction.register(newUser)
    }

    render() {
        return (
            <View> 
                <Text>Email</Text>
                <TextInput
                    keyboardType="email-address"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(email) => this._onEmailInputChange(email)}
                    value={this.state.user.email}
                />
                <Text>Password</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(password) => this._onPasswordInputChange(password)}
                    value={this.state.user.password}
                    secureTextEntry={true}
                />
                <Text>First name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(firstName) => this._onFirstNameInputChange(firstName)}
                    value={this.state.user.firstName}
                />
                <Text>Last name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(lastName) => this._onLastNameInputChange(lastName)}
                    value={this.state.user.lastName}
                />
                <Text>Age</Text>
                <TextInput
                    keyboardType="numeric"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(age) => this._onAgeInputChange(age)}
                    value={this.state.user.age ? this.state.user.age.toString() : ''}
                />

                <Text>{this.state.error}</Text>

                <TouchableHighlight onPress={this._submitForm.bind(this)}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        )
    }
} 
