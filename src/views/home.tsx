import React, { Component } from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import UserStore from '../Stores/User'
import { User } from '../Interfaces/User'

interface Props {

}

interface State {
    user:User,
    userIsLogged: Boolean
    isLoading: Boolean
}

function userIsLogged(){
    UserStore.userIsLogged()
}

export default class Home extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        userIsLogged()
        this.state = {  
            user: {},
            userIsLogged: false,
            isLoading: true    
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onUserChange.bind(this))
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserChange.bind(this))
    }

    _onUserChange(){
        var user:User = UserStore.getUser()   
        var userIsLogged:Boolean = false
        if(user.id){
            userIsLogged = true
        }

        console.log(user)

        this.setState({  
            user: user,
            userIsLogged: userIsLogged,
            isLoading: false    
        })
    }

    render() {
        let text:String
        if(this.state.isLoading === true){
            text = 'isLoading'
        } else if(this.state.userIsLogged  === true) {
            text = 'isLogged'
        } else {
            text = 'isNotLogged'
        }


        return (
            <View> 
                <Text>
                    {text}
                </Text>
            </View>
        )
    }
}
