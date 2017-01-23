import React, { Component, ViewStyle } from "react";
import { View, StyleSheet, Text, Navigator, Route , NavigatorStatic} from "react-native";

//Services
import i18n from '../Services/i18n'

//Components
import NavigatonBarBottom from '../Components/Main/NavigatonBarBottom'
import UserMenu from '../Components/User/Menu'

//Interface
interface Props {
}

interface State {  

}

//Component
export default class Home extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    navigator:Navigator

    navigatorRenderScene = (route:Route, navigator:NavigatorStatic) => {
        switch (route.id) {
            case 'screen0':
                return <View style={{flex:1}}>
                            <Text>home screen</Text>
                        </View>
            case 'screen3':
                return  <View style={{flex:1}}>
                            <UserMenu />
                        </View>
        }
    }   

    navigatorRoutes: Array<Route> = [
        {id: 'screen0', title: i18n.t('MAIN.HOME')},
        {id: 'screen1'},
        {id: 'screen2'},
        {id: 'screen3', title: i18n.t('MAIN.USER')},
    ];

    render() {
        return (
            <View style={{flex:1}}> 
                <View style={{flex:1, padding: 20}}>
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
                            <NavigatonBarBottom navigator={this.navigator} routes={this.navigatorRoutes} />
                        }
                    />
                </View>
            </View>
        )
    }
} 
