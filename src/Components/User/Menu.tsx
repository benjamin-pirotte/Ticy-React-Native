import React, { Component } from "react"
import { View, StyleSheet, TextInput, Text, TouchableHighlight, Navigator, NavigatorStatic, Route} from "react-native"

// Services
import i18n from '../../Services/i18n'

//Components
import EditForm from './EditForm'
import LogOut from './LogOut'
import NavigationBar from '../Main/NavigationBar'

//Interfaces

interface Props {
}

interface State {  

}

//Component
export default class UserMenu extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    navigator:Navigator

    navigatorRenderScene(route:Route, navigator:NavigatorStatic){
        switch (route.id) {
            case 'home' : 
                return <View> 
                            <TouchableHighlight onPress={() => this._navigate(1)}>
                                <Text>{i18n.t('USER.EDIT')}</Text>
                            </TouchableHighlight>
                            <LogOut />
                        </View> 
            case 'edit' :
            return <EditForm />
        }
    }   

    navigatorRoutes: Array<Route> = [
        {id: 'home', title: ''},
        {id: 'edit', title: i18n.t('USER.EDIT')}
    ];

    _navigate(index:number) {
        this.navigator.push(this.navigatorRoutes[index])
    }

    render() {
        return (
            <View style={{flex:1}}> 
                <Navigator 
                    initialRoute={this.navigatorRoutes[0]}
                    renderScene={(route, navigator) => {
                        this.navigator = navigator
                        return this.navigatorRenderScene(route, navigator)
                    }}
                    configureScene={(route) => {
                        return Navigator.SceneConfigs.FadeAndroid
                    }}
                    navigationBar={
                        <NavigationBar navigator={this.navigator} routes={this.navigatorRoutes} />
                    }
                />
            </View>
        )
    }
} 

