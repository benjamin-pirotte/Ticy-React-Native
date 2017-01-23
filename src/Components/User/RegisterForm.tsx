import React, { Component } from "react";
import {View, StyleSheet, TextInput, Text, TouchableHighlight, ViewStyle, Navigator, Route} from "react-native";

//Stores
import UserStore from '../../Stores/User'
import UserAction from '../../Actions/User'

//Constants
import userConstants from '../../Constants/User'

// Services
import i18n from '../../Services/i18n'

//Interfaces
import { NewUser } from '../../Interfaces/User'
import { Action } from '../../Interfaces/Dispatcher'

interface Props {
}

interface State  {
    error?:string
    user?: NewUser
}

//Component
export default class RegisterForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)

        this.state = {
            user: {}
        }
    }
    
    componentDidMount = () => {
        UserStore.addErrorListener(this._onFormError)
    }

    componentWillUnmount = () => {
        UserStore.removeErrorListener(this._onFormError)
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

    _onPasswordCopyInputChange = (value:string) => {
        let user = this.state.user
        user.passwordCopy = value
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
    _onFormError = (action:Action) => {
        if(action.type === userConstants._action.ERROR_REGISTER){
            let errorMessage: string

            switch (action.data) {
                case userConstants._actionError.EMAIL_ADDRESS_IS_NOT_VALID:
                    errorMessage = i18n.t('USER.EMAIL_ADDRESS_IS_NOT_VALID')
                    this.navigator.jumpTo(this.navigatorRoutes[0])
                    break;
                case userConstants._actionError.EMAIL_ALREADY_TAKEN:
                    errorMessage = i18n.t('USER.EMAIL_ALREADY_TAKEN')
                    this.navigator.jumpTo(this.navigatorRoutes[0])
                    break;
                case userConstants._actionError.PASSWORDS_ARE_NOT_IDENTICAL:
                    errorMessage = i18n.t('USER.PASSWORDS_ARE_NOT_IDENTICAL')
                    this.navigator.jumpTo(this.navigatorRoutes[0])
                    break;
                case userConstants._actionError.REQUIRED_FIELDS_ARE_MISSING:
                    errorMessage = i18n.t('MAIN.REQUIRED_FIELDS_ARE_MISSING')
                    this.navigator.jumpTo(this.navigatorRoutes[0])
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
        let user = this.state.user
        let newUser:NewUser = {
            email: user.email, 
            password: user.password, 
            passwordCopy: user.passwordCopy,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age
        }
        UserAction.register(newUser)

        this.setState({
            error: ''
        })   
    }

    //Navigator
    navigator:Navigator

    navigatorRenderScene = (route:Route, navigator:Navigator) => {
        switch (route.id) {
            case 'credential':
                return <View>
                            <Text>{i18n.t('USER.EMAIL')}</Text>
                            <TextInput
                                keyboardType="email-address"
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(email) => this._onEmailInputChange(email)}
                                value={this.state.user.email}
                            />
                            <Text>{i18n.t('USER.PASSWORD')}</Text>
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(password) => this._onPasswordInputChange(password)}
                                value={this.state.user.password}
                                secureTextEntry={true}
                            />
                            <Text>{i18n.t('USER.ONE_MORE_TIME')}</Text>
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(password) => this._onPasswordCopyInputChange(password)}
                                value={this.state.user.passwordCopy}
                                secureTextEntry={true}
                            />
                            <Text>{this.state.error}</Text>
                            <TouchableHighlight onPress={() => this._navigate(this.navigatorRoutes[1])}>
                                <Text>{i18n.t('MAIN.NEXT')}</Text>
                            </TouchableHighlight>
                        </View>
            case 'personalInfo':
                return <View>
                            <Text>{i18n.t('USER.FIRST_NAME')}</Text>
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(firstName) => this._onFirstNameInputChange(firstName)}
                                value={this.state.user.firstName}
                            />
                            <Text>{i18n.t('USER.LAST_NAME')}</Text>
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(lastName) => this._onLastNameInputChange(lastName)}
                                value={this.state.user.lastName}
                            />
                            <Text>{i18n.t('USER.AGE')}</Text>
                            <TextInput
                                keyboardType="numeric"
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(age) => this._onAgeInputChange(age)}
                                value={this.state.user.age ? this.state.user.age.toString() : ''}
                            />
                            <Text>{this.state.error}</Text>
                            <TouchableHighlight onPress={() => this._navigate(this.navigatorRoutes[0])}>
                                <Text>{i18n.t('MAIN.PREV')}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this._submitForm()}>
                                <Text>{i18n.t('USER.REGISTER')}</Text>
                            </TouchableHighlight>
                       </View>
        }
    }  

    _navigate = (scene:Route) => {
        let isValid = true
        switch (scene.id) {
            case 'personalInfo':
                if(!this.state.user.email || !this.state.user.password || !this.state.user.passwordCopy){
                    isValid = false
                    this._onFormError({
                        type: userConstants._action.ERROR_REGISTER,
                        data: userConstants._actionError.REQUIRED_FIELDS_ARE_MISSING
                    })
                }
            break;
        }
        if(isValid) {
            this.navigator.jumpTo(scene)
            this.setState({
                error: ''
            })
        }
    } 

    navigatorRoutes: Array<Route> = [
        {id: 'credential'},
        {id: 'personalInfo'}
    ];

    render() {
        return (
            <View style={styles.container}> 
                <View style={{flex:1}}>
                    <Navigator
                        initialRoute={this.navigatorRoutes[0]}
                        initialRouteStack={this.navigatorRoutes}
                        renderScene={(route, navigator) => {
                            this.navigator = navigator
                            return this.navigatorRenderScene(route, navigator)
                        }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.FadeAndroid
                        }}
                    />
                </View>
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