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
            birthdate: new Date(),
            firstName: 'test',
            lastName: 'test',
            password:'test123',
            email:'test@test.com',
            gender: 'm',
            phone: '0493934334'
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

    _onPhoneInputChange = (value:string) => {
        let state = this.state
        state.phone = value        
        this.setState(state)
    }

    _onBirthdateInputChange = (date:Date) => {
        let state = this.state
        state.birthdate = date
        this.setState(state)       
    }

    _onGenderInputChange = (value:string) => {
        let state = this.state
        state.gender = value        
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
            birthdate: this.state.birthdate,
            gender: this.state.gender,
            phone: this.state.phone
        }
        UserStore.register(newUser).then(function(response){
            // Store emit change
        }, function(response){
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
                <Text>Phone</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(phone) => this._onPhoneInputChange(phone)}
                    value={this.state.phone}
                />
                <Text>Birthdate (dd/mm/yyyy)</Text>
                <DatePicker date={this.state.birthdate} mode={'date'} onDateChange={this._onBirthdateInputChange} />
                
                <Text style={{width:100}}>Gender</Text>

                <Picker style={{width: 100}}
                    selectedValue={this.state.gender}
                    onValueChange={this._onGenderInputChange.bind(this)}>
                    <Picker.Item label="female" value="w" />
                    <Picker.Item label="male" value="m" />
                    <Picker.Item label="other" value="o" />
                </Picker>

                <Text>{this.state.error}</Text>

                <TouchableHighlight onPress={this._submitForm.bind(this)}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        )
    }
} 
