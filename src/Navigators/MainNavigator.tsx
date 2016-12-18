import React, { Component } from "react";
import { Text, StyleSheet, Navigator, TouchableHighlight } from "react-native";

interface Props {

}

interface State {
 
}

const routes = [
    {title: 'Home', index: 0},
    {title: 'Login', index: 1},
    {title: 'Register', index: 2},
    {title: 'Edit', index: 3},
]

export default class MainNavigator extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Navigator
            initialRoute={routes[0]}
            initialRouteStack={routes}
            renderScene={(route, navigator) =>
                <TouchableHighlight onPress={() => {
                if (route.index === 0) {
                    navigator.push(routes[1])
                } else {
                    navigator.pop();
                }
                }}>
                    <Text>Hello {route.title}!</Text>
                </TouchableHighlight>
            }
            />
        );
    }
}
