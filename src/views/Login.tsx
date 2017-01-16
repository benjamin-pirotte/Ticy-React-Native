import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Navigator, Route } from "react-native"

//Stores
import UserStore from '../Stores/User'

//Navigators
import LoginNavigator from '../Navigators/LoginNavigator'

// Services
import i18n from '../Services/i18n'

//Components
import LoginForm from '../Components/User/LoginForm'
import RegisterForm from '../Components/User/RegisterForm'
 
//Interfaces
import { User } from '../Interfaces/User'

interface Props {
    hasBeenDisconnected: Boolean
}

interface State {  
    newUser: boolean
}

export default class Login extends Component<Props, State> {
    constructor(props : Props) {
        super(props)

        this.state = {
            newUser: false
        }
    }

    _switchView = (isNewUser:boolean) => {     
        if(isNewUser === this.state.newUser) return 

        this.setState({
            newUser: isNewUser
        })

        if(isNewUser){
            this.navigator.push({id: 'register'})
        }else {
            this.navigator.push({id: 'login'})
        }
    }

    navigator:Navigator

    navigatorRenderScene = (route:Route, navigator:Navigator) => {
        switch (route.id) {
            case 'login':
                return <LoginForm />
            case 'register':
                return <RegisterForm />
        }
    }   

    render() {
        let hasBeenDisconnectedMessage:any = null
        if (this.props.hasBeenDisconnected) {
            hasBeenDisconnectedMessage = <Text>You have been disconnected, please connect again</Text>
        }

        return (
            <View style={{flex: 2}}>
                <View style={{flex:2, backgroundColor: 'powderblue'}}>
                </View>
                <View style={{flex:2}}>
                    <Navigator
                        initialRoute={{id: 'login'}}
                        renderScene={(route, navigator) => {
                            this.navigator = navigator
                            return this.navigatorRenderScene(route, navigator)
                        }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.FadeAndroid
                        }}
                    />
                </View>
                <View style={{height:50, alignItems:'center'}}>
                    { this.state.newUser === false &&
                        <TouchableHighlight onPress={() => this._switchView(true)}>
                            <Text>{i18n.t('USER.ARE_YOU_AN_EXISTING_USER')}</Text>
                        </TouchableHighlight>
                    }
                    { this.state.newUser === true &&
                        <TouchableHighlight onPress={() => this._switchView(false)}>
                            <Text>{i18n.t('USER.ARE_YOU_A_NEW_USER')}</Text>
                        </TouchableHighlight>
                    }   
                </View>
            </View>
        )
    }
} 

