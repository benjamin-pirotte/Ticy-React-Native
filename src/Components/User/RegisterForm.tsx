import React, { Component } from "react";
import {View, StyleSheet, TextInput, Text, TouchableHighlight} from "react-native";

//Stores
import UserStore from '../../Stores/User'

//Interfaces
import { NewUser } from '../../Interfaces/User'

interface Props {
}

interface State extends NewUser {
    error?:string
}

export default class RegisterForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // On change
    _onEmailInputChange(value:string):void{
        let state = this.state
        state.email = value.toLowerCase().trim()
        this.setState(state)       
    }

    _onPasswordInputChange(value:string):void{
        let state = this.state
        state.password = value        
        this.setState(state)
    }

    _onFirstNameInputChange(value:string):void{
        let state = this.state
        state.firstName = value
        this.setState(state)       
    }

    _onLastNameInputChange(value:string):void{
        let state = this.state
        state.lastName = value        
        this.setState(state)
    }

    _onBirthdateInputChange(value:Date):void{
        let state = this.state
        state.birthdate = value
        this.setState(state)       
    }

    _onGenderInputChange(value:string):void{
        let state = this.state
        state.gender = value        
        this.setState(state)
    }

    // On submit
    _submitForm():void {
        let component = this
        UserStore.register(
            {
                email: this.state.email, 
                password: this.state.password, 
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthdate: new Date(),
                gender: 'M'
            }
        )
    }

    render() {
        let datePicker:any
        
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
                <Text>First name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(firstName) => this._onFirstNameInputChange(firstName)}
                    value={this.state.firstName}
                    secureTextEntry={true}
                />
                <Text>Last name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(lastName) => this._onPasswordInputChange(lastName)}
                    value={this.state.lastName}
                    secureTextEntry={true}
                />
                <Text>Birthdate</Text>
                
                
                <Text>Gender</Text>

                <Text>{this.state.error}</Text>

                <TouchableHighlight onPress={this._submitForm.bind(this)}>
                    <Text>Log in</Text>
                </TouchableHighlight>
            </View>
        )
    }
} 
