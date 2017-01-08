import React, { Component } from "react";

//Stores
import UserStore from '../../Stores/User'

//Stores
import UserAction from '../../Actions/User'

//Components
import {View, StyleSheet, TextInput, Text, TouchableHighlight} from "react-native";

//Interfaces

interface Props {
}

interface State {
    oldPassword?:string
    newPassword?:string
    newPasswordCopy?:string
    error?:string
}

export default class EditPassword extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            newPasswordCopy: ''
        }
    }

    componentDidMount = () => {
        UserStore.addChangeListener(this._onUserChange.bind(this))
        UserStore.addErrorListener(this._onFormError.bind(this))
    }

    componentWillUnmount = () => {
        UserStore.removeChangeListener(this._onUserChange.bind(this))
        UserStore.removeErrorListener(this._onFormError.bind(this))
    }

    // On change
    _onUserChange = () => {
    }

    _onPasswordChange = (value:string) => {
        this.setState({
            oldPassword: value
        })  
    }

    _onNewPasswordChange = (value:string) => {
        this.setState({
            newPassword: value
        })  
    }

    _onNewPasswordCopyChange = (value:string) => {
        this.setState({
            newPasswordCopy: value
        })  
    }

    // On form error
    _onFormError = (type:string, message:string) => {
    }
    
    
    // On submit
    _submitForm = () => {
        UserStore.addErrorListener(this._onFormError.bind(this))

        if(this.state.newPassword !== this.state.newPasswordCopy){
            this.setState({
                error: "The new passwords are not identical"
            } as State)
        } else if (this.state.newPassword && this.state.newPassword === this.state.oldPassword) {
            this.setState({
                error: "The old and new passwords are identical"
            } as State)
        } else {
            UserAction.editPassword(this.state.oldPassword, this.state.newPassword)
        }
    }

    render() {            
        return ( 
            <View> 
                <Text>Current password</Text>
                <TextInput
                    keyboardType="email-address"
                    onChangeText={(oldPassword) => this._onPasswordChange(oldPassword)}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.oldPassword}
                    secureTextEntry={true}
                />
                <Text>New password</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(newPassword) => this._onNewPasswordChange(newPassword)}
                    value={this.state.newPassword}
                    secureTextEntry={true}
                />
                <Text>One more time</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(newPasswordCopy) => this._onNewPasswordCopyChange(newPasswordCopy)}
                    value={this.state.newPasswordCopy}
                    secureTextEntry={true}
                />
                <Text>{this.state.error}</Text>
                <TouchableHighlight onPress={this._submitForm.bind(this)}>
                    <Text>Update password</Text>
                </TouchableHighlight>
            </View>
        )
    }
} 
