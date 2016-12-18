import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import UserStore from '../Stores/User'
import { User } from '../Interfaces/User'

import Login from './Login'
import Home from './Home'

interface Props {

}

interface State {  
    user:User,
    userIsLogged: Boolean
    isLoading: Boolean,
}

function userIsLogged(){
    UserStore.userIsLogged()
}

export default class Main extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        userIsLogged()
        this.state = {  
            user: {},
            userIsLogged: false,
            isLoading: true,
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

        let state = this.state
        state.user = user,
        state.userIsLogged = userIsLogged,
        state.isLoading = false

        this.setState(state)
    }

    render() {
        
        let view:any
        if(this.state.userIsLogged  === true) {
            return <Home />
        } else {
            view = <Login hasBeenDisconnected={false} />
        }

        return (
            <View> 
                {view}
            </View>
        )
    }
}
