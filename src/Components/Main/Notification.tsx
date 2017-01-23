import React, { Component } from "react"
import { View, StyleSheet, TextInput, Text, TouchableHighlight, AsyncStorage} from "react-native"

//Dispatcher
import {MainDispatcher} from '../../Dispatcher/AppDispatcher'

// Constants
import {notifcation, apiError} from '../../Constants/Main'

// Services
import i18n from '../../Services/i18n'

//Interface
import { Action, Payload } from '../../Interfaces/Dispatcher'

interface Props {
}

interface State {  
    message?: string
    show: boolean
}

//Component
export default class Notification extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            message:'',
            show: false
        }
    }

    componentDidMount = () => {
        MainDispatcher.register((payload:Payload) => {
            var action = payload.action  

            switch (action.type) {
                case apiError.SERVER_NOT_RESPONDING:
                    this.setState({
                        message: i18n.t('MAIN.SERVER_NOT_RESPONDING'),
                        show: true
                    })
                    break;
            }

            if(this.state.show){
                setTimeout(() => {
                    this.setState({
                        show: false
                    })
                }, notifcation.timeOut)
            }
        })
    }


    render() {
        let notificationStyle = () => {
            if(this.state.show){
                return {
                    opacity: 1
                }
            } else {
                return {
                    opacity: 0
                }
            }
        }

        return (
            <View> 
                <Text style={notificationStyle()}>{this.state.message}</Text>
            </View>
        )
    }
} 

