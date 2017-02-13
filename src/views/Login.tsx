import React, { Component } from "react"
import { View, ScrollView, StyleSheet, Text, TouchableHighlight, Navigator, NavigatorStatic, Route } from "react-native"

//Stores
import UserStore from '../Stores/User'

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

        setInterval(function(){
            UserStore.emitError({
                type:'test',
                data:'test'
            })
        }, 2000)
        
    }

    navigator:Navigator

    navigatorRenderScene(route:Route, navigator:NavigatorStatic) {
        switch (route.id) {
            case 'login':
                return <View  style={{flex:2}}>
                        <LoginForm/>
                        <TouchableHighlight onPress={() => this.navigator.replace(this.navigatorRoutes[1])}>
                            <Text>{i18n.t('USER.ARE_YOU_AN_EXISTING_USER')}</Text>
                        </TouchableHighlight>
                        </View>
            case 'register':
                return  <View style={{flex:2}}>
                            <RegisterForm/>
                            <TouchableHighlight onPress={() => this.navigator.replace(this.navigatorRoutes[0])}>
                                <Text>{i18n.t('USER.ARE_YOU_A_NEW_USER')}</Text>
                            </TouchableHighlight>
                        </View>
        }
    }   

    navigatorRoutes: Array<Route> = [
        {id: 'login', index: 0},
        {id: 'register', index: 1},
    ];

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
                        initialRoute={this.navigatorRoutes[0]}
                        //initialRouteStack={this.navigatorRoutes}
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

