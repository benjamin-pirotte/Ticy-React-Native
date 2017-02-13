import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableHighlight, NavigatorStatic} from "react-native"


//Interface
interface Props {
    navigator:NavigatorStatic
    routes: Array<Object>
}

interface State {}

//Component
export default class NavigatonBarBottom extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
    }

    _navigate(index:number) {
        this.props.navigator.replace(this.props.routes[index])
    }

    render() {
        return (
            <View style={{height:20, flexDirection: 'row', backgroundColor: 'grey'}}> 
                <TouchableHighlight style={{flex:1, alignItems:'center'}} onPress={() => this._navigate(0)}>
                    <Text>Home</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{flex:1, alignItems:'center'}} onPress={() => this._navigate(1)}>
                    <Text></Text>
                </TouchableHighlight>
                <TouchableHighlight style={{flex:1, alignItems:'center'}} onPress={() => this._navigate(2)}>
                    <Text></Text>
                </TouchableHighlight>
                <TouchableHighlight style={{flex:1, alignItems:'center'}} onPress={() => this._navigate(3)}>
                    <Text>User</Text>
                </TouchableHighlight>
            </View>
        )
    }
} 

