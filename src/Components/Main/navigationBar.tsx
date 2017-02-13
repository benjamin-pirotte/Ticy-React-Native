import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableHighlight, NavigatorStatic} from "react-native"


//Interface
interface Props {
    navigator:NavigatorStatic
    routes: Array<Object>
}

interface State {}

//Component
export default class NavigatonBar extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    _navigate = function(index:number) {
        this.props.navigator.pop()
    }

    render() {
        let routes = this.props.navigator.getCurrentRoutes()
        let currentRoute = routes[routes.length - 1]
        let showBar = routes.length > 1
        return (
            <View>
            {showBar &&
                <View style={{height:20, flexDirection: 'row', backgroundColor: 'grey'}}> 
                    <TouchableHighlight style={{flex:1, alignItems:'center'}} onPress={() => this._navigate(0)}>
                        <Text>Back</Text>
                    </TouchableHighlight>
                    <Text>{currentRoute.title}</Text>
                </View>
            }
            </View>
        )
    }
} 

