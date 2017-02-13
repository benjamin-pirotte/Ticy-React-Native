import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage, ViewStyle, Route} from "react-native";
import TextField from "../../Components/Main/TextField"
import Button from "../../Components/Main/Button"

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

        AsyncStorage.getItem('USER_EMAIL', (err, result) => {
            if(result){
                this.setState({
                    email: result.toLowerCase().trim()
                })
            }
        })
    }

    componentDidMount() {
        UserStore.addErrorListener(this._onFormError)
    }

    componentWillUnmount() {
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
        if(this.state.email){
            AsyncStorage.setItem('USER_EMAIL', this.state.email)
        }
        UserAction.login(this.state.email, this.state.password)

        this.setState({
            error: ''
        }) 
    }

    render() {
        return (
            <View style={styles.container}> 
                <TextField
                    placeholder={i18n.t('USER.EMAIL')}
                    onTextChange={this._onEmailInputChange}
                    floatingLabelEnabled={true}
                    defaultValue={this.state.email}
                    allowFontScaling={true}
                    style={{height: 48}}
                />
                <TextField
                    placeholder={i18n.t('USER.PASSWORD')}
                    onTextChange={this._onPasswordInputChange}
                    floatingLabelEnabled={true}
                    password={true}
                />
                <Text>{this.state.error}</Text>                
                <Button text={i18n.t('USER.LOG_IN')} onPress={() => this._submitForm()} preset="coloredButton"/>
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