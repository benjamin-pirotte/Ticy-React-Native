import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage, ViewStyle, Route} from "react-native";

//Stores
import UserStore from '../../Stores/User'

//Actions
import UserAction from '../../Actions/User'

// Services
import i18n from '../../Services/i18n'

//Constants
import userConstants from '../../Constants/User'

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

//Component
export default class LoginForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {
        UserStore.addErrorListener(this._onFormError)
        AsyncStorage.getItem('USER_EMAIL', (err, result) => {
            this.setState({
                email: result.toLowerCase().trim()
            })   
        })
    }

    componentWillUnmount = () => {
        UserStore.removeErrorListener(this._onFormError)
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
        if(action.type === userConstants._action.ERROR_LOGIN){
            let errorMessage: string
            switch (action.data) {
                case userConstants._actionError.INCORRECT_CREDENTIALS:
                    errorMessage = i18n.t('USER.WRONG_LOGIN_CREDENTIALS')
                    break;
                case userConstants._actionError.REQUIRED_FIELDS_ARE_MISSING:
                    errorMessage = i18n.t('MAIN.REQUIRED_FIELDS_ARE_MISSING')
                    break;
                case userConstants._actionError.SERVER_NOT_RESPONDING:
                    errorMessage = i18n.t('MAIN.SERVER_NOT_RESPONDING')
                    break;   
                default:
                    errorMessage = i18n.t('MAIN.UNKNOWN_ERROR')
                    break;
            }
            this.setState({
                error: errorMessage
            })   
        }
    }

    // On submit
    _submitForm = () => {
        AsyncStorage.setItem('USER_EMAIL', this.state.email)
        UserAction.login(this.state.email, this.state.password)

        this.setState({
            error: ''
        }) 
    }

    render() {
        return (
            <View style={styles.container}> 
                <Text>{i18n.t('USER.EMAIL')}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(email) => this._onEmailInputChange(email)}
                    value={this.state.email}
                />
                <Text>{i18n.t('USER.PASSWORD')}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(password) => this._onPasswordInputChange(password)}
                    value={this.state.password}
                    secureTextEntry={true}
                />
                <Text>{this.state.error}</Text>
                <TouchableHighlight onPress={() => this._submitForm()}>
                    <Text>{i18n.t('USER.LOG_IN')}</Text>
                </TouchableHighlight>

            </View>
        )
    }
} 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  } as ViewStyle,
})