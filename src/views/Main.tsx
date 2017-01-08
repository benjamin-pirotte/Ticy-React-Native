import React, { Component } from "react"
import { View, StyleSheet, Text, TouchableHighlight } from "react-native"

// Stores
import UserStore from '../Stores/User'

// Actions
import UserActions from '../Actions/User'

// Views
import Login from './Login'
import Home from './Home'

//Components
import LogOut from '../Components/User/LogOut'
import EditForm from '../Components/User/EditForm'

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

    componentDidMount = () => {
        UserStore.addChangeListener(this._onUserChange.bind(this))
    }

    componentWillUnmount = () => {
        UserStore.removeChangeListener(this._onUserChange.bind(this))
    }

    _onUserChange = (event:Event) =>{
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
            view = <View>
                     <LogOut  />
                     <Home /> 
                     <EditForm /> 
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