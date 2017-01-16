import React, { Component } from "react";
import { Text, StyleSheet, Navigator, TouchableHighlight, Route } from "react-native";

//Components
import LoginForm from '../Components/User/LoginForm'
import RegisterForm from '../Components/User/RegisterForm'

//Interface
interface Props {
}

interface State {  
}

export default class LoginNavigation extends Component<Props, State>{
    constructor(props : Props) {
        super(props)  
    }

    navigatorRenderScene(route:Route, navigator:Navigator) {
        switch (route.id) {
            case 'login':
                return (<LoginForm />)
            case 'register':
                return (<RegisterForm />)
        }
    }   

    render() {
        return (
            <Navigator
                initialRoute={{id: 'login'}}
                renderScene={this.navigatorRenderScene}
            />
        );
    }
}