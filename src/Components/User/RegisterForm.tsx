import React, { Component } from "react";
import { Platform, View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native";

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
    _submitRegisterForm():void {
        let component = this

    }

    render() {
        return (
            <View> 
                <Text>{Platform.OS}</Text>
            </View>
        )
    }
} 
