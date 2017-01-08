import React, { Component } from "react";

//Stores
import UserStore from '../../Stores/User'

//Action
import UserAction from '../../Actions/User'

//Components
import { View, StyleSheet, TextInput, Text, TouchableHighlight, Modal, ViewStyle } from "react-native";
import EditPassword from './EditPassword'

//Interfaces
import { User } from '../../Interfaces/User'

interface Props {
}

interface State {
    user?: User
    error?: string,
    editPasswordModal?: boolean,
    currentOrientation?: string
}

export default class EditForm extends Component<Props, State> {
    constructor(props : Props) {
        super(props)
        this.state = {
            user: UserStore.getUser(),
            error: '',
            editPasswordModal: false,
            currentOrientation: 'unknown'
        }
    }

    componentDidMount = () => {
        UserStore.addChangeListener(this._onUserChange.bind(this))
        UserStore.addErrorListener(this._onFormError.bind(this))
    }

    componentWillUnmount = () => {
        UserStore.removeChangeListener(this._onUserChange.bind(this))
        UserStore.addErrorListener(this._onFormError.bind(this))
    }

    // On change
    _onUserChange = () => {
        UserStore.removeErrorListener(this._onFormError.bind(this))
 
        if(this.state.editPasswordModal) {
            this.setState({
                editPasswordModal: false
            })  
        }
    }

    _onEmailInputChange = (value:string) => {
        let user = this.state.user
        user.email = value.toLowerCase().trim()
        this.setState({
            user: user
        })  
    }

    _onFirstNameInputChange = (value:string) => {
        let user = this.state.user
        user.firstName = value
        this.setState({
            user: user
        })   
    }

    _onLastNameInputChange = (value:string) => {
        let user = this.state.user
        user.lastName = value
        this.setState({
            user: user
        })   
    }

    _onAgeInputChange = (value:string) => {
        let user = this.state.user
        user.age = parseInt(value)
        this.setState({
            user: user
        })   
    }

    // On form error
    _onFormError = (type:string, message:string) => {
    }
    
    // On submit
    _submitForm = () => {
        UserStore.addErrorListener(this._onFormError.bind(this))

        let user:User = {
            email: this.state.user.email, 
            firstName: this.state.user.firstName,
            lastName: this.state.user.lastName,
            age: this.state.user.age
        }
        UserAction.edit(user)
    }

    // Modal
    _onOrientationchange = (event:any) => {
       let state = this.state
       state.currentOrientation =  event.nativeEvent.orientation
       this.setState(state)
    }

    _togglePasswordModal = () => {
        let state = this.state
        state.editPasswordModal = !state.editPasswordModal
        this.setState(state)
    }

    render() {        
        return (
            <View> 
                <Text>Email</Text>
                <TextInput
                    keyboardType="email-address"
                    onChangeText={(email) => this._onEmailInputChange(email)}
                    onBlur={() => this._submitForm()}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.user.email}
                />
                <Text>First name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(firstName) => this._onFirstNameInputChange(firstName)}
                    onBlur={() => this._submitForm()}
                    value={this.state.user.firstName}
                />
                <Text>Last name</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(lastName) => this._onLastNameInputChange(lastName)}
                    onBlur={() => this._submitForm()}
                    value={this.state.user.lastName}
                />
                <Text>Age</Text>
                <TextInput
                    keyboardType="numeric"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(age) => this._onAgeInputChange(age)}
                    onBlur={() => this._submitForm()}
                    value={this.state.user.age ? this.state.user.age.toString() : ''}
                />
                <Text>{this.state.error}</Text>


                <TouchableHighlight onPress={this._togglePasswordModal.bind(this)}>
                    <Text>Change password</Text>
                </TouchableHighlight>

                <Modal transparent={true} visible={this.state.editPasswordModal}
                supportedOrientations={['portrait', 'landscape']} onOrientationChange={this._onOrientationchange.bind(this)}>
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            <EditPassword />
                            <TouchableHighlight onPress={this._togglePasswordModal.bind(this)}>
                                <Text>Close</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  } as ViewStyle,
  innerContainer: {
    borderRadius: 10,
    backgroundColor: 'white', 
    padding: 20
  } as ViewStyle
})