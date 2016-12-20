import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableHighlight } from "react-native"

// Stores
import UserStore from '../Stores/User'

// Views
import Login from './Login'
import Home from './Home'

//Components
import LogOut from '../Components/User/LogOut'

// interfaces
import { User } from '../Interfaces/User'


interface Props {

}

interface State {  
    user:User
    userIsLogged: Boolean
    isLoading: Boolean
    hasBeenDisconnected: Boolean
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
            hasBeenDisconnected: false
        }
    }

    componentDidMount() {
        UserStore.addChangeListener(this._onUserChange.bind(this))
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserChange.bind(this))
    }

    _onUserChange(){
        let state = this.state

        state.isLoading = false

        state.user = UserStore.getUser()  

        if(state.user.id) {
            state.userIsLogged = true
        } else {
            state.userIsLogged = false
            if(this.state.userIsLogged){
                state.hasBeenDisconnected = true
            }
        }

        this.setState(state)
    }

    render() {
        let view:any
        if(this.state.isLoading  === true) { 
            view = <Text>Loading</Text>
        } else if(this.state.userIsLogged  === true) {
            view = <View>
                     <LogOut  />
                     <Home /> 
                   </View>
        } else {
            view = <Login hasBeenDisconnected={this.state.hasBeenDisconnected} />
        }

        return (
            <View style={mainStyle}> 
                {view}
            </View>
        )
    }
}

var mainStyle = {
    paddingTop: 20
}