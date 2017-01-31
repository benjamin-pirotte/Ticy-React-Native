import React, { Component } from "react";

//Stores
import UserStore from '../../Stores/User'

//Actions
import UserAction from '../../Actions/User'

// Services
import i18n from '../../Services/i18n'

//Constants
import userConstants from '../../Constants/User'

//Components
import {View, StyleSheet, TextInput, Text, TouchableHighlight} from "react-native";

//Interfaces
import { Action } from '../../Interfaces/Dispatcher'

interface Props {
}

interface State {
    oldPassword?:string
    password?:string
    passwordCopy?:string
    error?:string 
}

//Component
export default class EditPassword extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            oldPassword: '',
            password: '',
            passwordCopy: ''
        }
    }

    componentDidMount = () => {
        UserStore.addChangeListener(this._onUserChange)
        UserStore.addErrorListener(this._onFormError)
    }

    componentWillUnmount = () => {
        UserStore.removeChangeListener(() => this._onUserChange)
        UserStore.removeErrorListener(() => this._onFormError)
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
            password: value
        })  
    }

    _onNewPasswordCopyChange = (value:string) => {
        this.setState({
            passwordCopy: value
        })  
    }

    // On form error
    _onFormError = (action:Action) => {
        console.log(action)
        if(action.type === userConstants._action.ERROR_EDIT_PASSWORD){
            let errorMessage: string
            console.log(action.data === userConstants._actionError.NO_CHANGE)
            switch (action.data) {
                case userConstants._actionError.NO_CHANGE:
                    errorMessage = i18n.t('USER.PASSWORDS_ARE_IDENTICALS')
                    break;
                case userConstants._actionError.INCORRECT_CREDENTIALS:
                    errorMessage = i18n.t('USER.CURRENT_PASSWORD_NOT_CORRECT')
                    break;
                case userConstants._actionError.PASSWORDS_ARE_NOT_IDENTICAL:
                    errorMessage = i18n.t('USER.PASSWORDS_ARE_NOT_IDENTICAL')
                    break;
                case userConstants._actionError.REQUIRED_FIELDS_ARE_MISSING:
                    errorMessage = i18n.t('MAIN.REQUIRED_FIELDS_ARE_MISSING')
                    break;
                case userConstants._actionError.CANT_RETURN_API_KEY:
                    errorMessage = i18n.t('MAIN.LOGIN_NEEDED')
                    break;
                default:
                    errorMessage = i18n.t('MAIN.UNKNOWN_ERROR')
                    break;
            }
            console.log(errorMessage)
            this.setState({
                error: errorMessage
            })   
        }
    }
    
    
    // On submit
    _submitForm = () => {
        UserAction.editPassword(this.state.oldPassword, this.state.password, this.state.passwordCopy)
        this.setState({
            error: ''
        })   
    }

    render() {            
        return ( 
            <View> 
                <Text>{i18n.t('USER.CURRENT_PASSWORD')}</Text>
                <TextInput
                    keyboardType="email-address"
                    onChangeText={(oldPassword) => this._onPasswordChange(oldPassword)}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.oldPassword}
                    secureTextEntry={true}
                />
                <Text>{i18n.t('USER.NEW_PASSWORD')}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(password) => this._onNewPasswordChange(password)}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text>{i18n.t('USER.ONE_MORE_TIME')}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(passwordCopy) => this._onNewPasswordCopyChange(passwordCopy)}
                    value={this.state.passwordCopy}
                    secureTextEntry={true}
                />
                <Text>{this.state.error}</Text>
                <TouchableHighlight onPress={() => this._submitForm()}>
                    <Text>{i18n.t('USER.UPDATE')}</Text>
                </TouchableHighlight>
            </View>
        )
    }
} 
