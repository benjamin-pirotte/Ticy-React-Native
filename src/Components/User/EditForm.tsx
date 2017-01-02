import React, { Component } from "react";

//Stores
import UserStore from '../../Stores/User'

//Components
import {View, StyleSheet, TextInput, Text, Picker, TouchableHighlight} from "react-native";
import DatePicker from '../Main/Form/DatePicker'

//Interfaces
import { User } from '../../Interfaces/User'

interface Props {
}

interface State extends User {
    error?:string
}

export default class RegisterForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = UserStore.getUser()
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    // On change
    _onEmailInputChange = (value:string) => {
        let state = this.state
        state.email = value.toLowerCase().trim()
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
    _submitForm() {
        let component = this
        let user:User = {
            email: this.state.email, 
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.age
        }
        UserStore.editUser(user).then((response) => {
            let state = component.state
            state.error = '' 
            component.setState(state)
            // Store emit change
        }, (response) => {
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
                    onChangeText={(email) => this._onEmailInputChange(email)}
                    onBlur={() => this._submitForm()}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.email}
                />
                <Text>First name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(firstName) => this._onFirstNameInputChange(firstName)}
                    onBlur={() => this._submitForm()}
                    value={this.state.firstName}
                />
                <Text>Last name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(lastName) => this._onLastNameInputChange(lastName)}
                    onBlur={() => this._submitForm()}
                    value={this.state.lastName}
                />
                <Text>Age</Text>
                <TextInput
                    keyboardType="numeric"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(age) => this._onAgeInputChange(age)}
                    onBlur={() => this._submitForm()}
                    value={this.state.age ? this.state.age.toString() : ''}
                />
                <Text>{this.state.error}</Text>
            </View>
        )
    }
} 
