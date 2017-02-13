import React, { Component } from "react"
import { View, StyleSheet, Text, ViewStyle } from "react-native"

// Stores
import UserStore from '../Stores/User'

// Actions
import UserActions from '../Actions/User'

// Views
import Login from './Login'
import Home from './Home'

//Components
import Notification from '../Components/Main/Notification'

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

let userIsLogged = () => {
    UserActions.update()
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
        UserStore.addChangeListener(this._onUserChange)
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onUserChange)
    }

    _onUserChange = (event:Event) => {
        let isLoading:boolean = false
        let userIsLogged:boolean = false
        let user:User = UserStore.getUser()  
        let hasBeenDisconnected:boolean = false 

        if(user.id) {
            userIsLogged = true
        } else {
            userIsLogged = false
            if(userIsLogged){
                hasBeenDisconnected = true
            }
        }
        this.setState({
            isLoading: isLoading,
            userIsLogged: userIsLogged,  
            user: user,
            hasBeenDisconnected: hasBeenDisconnected 
        })
    }

    render() {
        let view:any
        if(this.state.isLoading  === true) { 
            view = <Text>Loading</Text>
        } else if(this.state.userIsLogged  === true) {
            view = <Home />
        } else {
            view = <Login hasBeenDisconnected={this.state.hasBeenDisconnected} />
        }
        return (
            <View style={{flex:1}}> 
                {view}
                <Notification />
            </View>
        )
    }
}
