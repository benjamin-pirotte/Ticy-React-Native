import React, { Component } from "react";

//Stores
import UserStore from '../../Stores/User'

//Components
import {View, StyleSheet, TextInput, Text, Picker, TouchableHighlight} from "react-native";
import DatePicker from '../Main/Form/DatePicker'

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
        this.state = {
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // On change
    _onEmailInputChange = (value:string) =>{
        let state = this.state
        state.email = value.toLowerCase().trim()
        this.setState(state)       
    }

    _onPasswordInputChange = (value:string) => {
        let state = this.state
        state.password = value        
        this.setState(state)
    }

    _onFirstNameInputChange = (value:string) => {
        let state = this.state
        state.firstName = value
        this.setState(state)       
    }

    _onLastNameInputChange = (value:string) => {
        let state = this.state
        state.lastName = value        
        this.setState(state)
    }

    _onAgeInputChange = (value:string) => {
        let state = this.state
        state.age = parseInt(value)       
        this.setState(state)
    }


    // On submit
    _submitForm():void {
        let component = this
        let newUser:NewUser = {
            email: this.state.email, 
            password: this.state.password, 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age
        }
        UserStore.register(newUser).then((response) => {
            // Store emit change
            let state = component.state
            state.error = 'User has been created'  
            component.setState(state)
        },  (response) => {
            let state = component.state
            state.error = response['message']    
            component.setState(state)
        })

    }

    render() {
        let datePicker:any
        
        return (
            <View> 
                <Text>Email</Text>
                <TextInput
                    keyboardType="email-address"
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
                />
                <Text>Last name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(lastName) => this._onLastNameInputChange(lastName)}
                    value={this.state.lastName}
                />
                <Text>Age</Text>
                <TextInput
                    keyboardType="numeric"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(age) => this._onAgeInputChange(age)}
                    value={this.state.age ? this.state.age.toString() : ''}
                />

                <Text>{this.state.error}</Text>

                <TouchableHighlight onPress={this._submitForm.bind(this)}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        )
    }
} 
