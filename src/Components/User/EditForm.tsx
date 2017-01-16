import React, { Component } from "react";

//Stores
import UserStore from '../../Stores/User'

//Action
import UserAction from '../../Actions/User'

// Services
import i18n from '../../Services/i18n'

//Constsants
import userConstants from '../../Constants/User'

//Components
import { View, StyleSheet, TextInput, Text, TouchableHighlight, Modal, ViewStyle } from "react-native";
import EditPassword from './EditPassword'

//Interfaces
import { User } from '../../Interfaces/User'
import { Action } from '../../Interfaces/Dispatcher'

interface Props {
}

interface State {
    user?: User
    error?: string,
    editPasswordModal?: boolean,
    currentOrientation?: string
}


//Component
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
        UserStore.addChangeListener(() => this._onUserChange())
        UserStore.addErrorListener((action:Action) => this._onFormError(action))
    }

    componentWillUnmount = () => {
        UserStore.removeChangeListener(() => this._onUserChange)
        UserStore.addErrorListener(() => this._onFormError)
    }
    
    
    // On change
    _onUserChange = () => { 
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

        this._submitForm()
    }

    _onFirstNameInputChange = (value:string) => {
        let user = this.state.user
        user.firstName = value
        this.setState({
            user: user
        }) 

        this._submitForm()
    }

    _onLastNameInputChange = (value:string) => {
        let user = this.state.user
        user.lastName = value
        this.setState({
            user: user
        })  

        this._submitForm()
    }

    _onAgeInputChange = (value:string) => {
        let user = this.state.user
        user.age = parseInt(value)
        this.setState({
            user: user
        })   

        this._submitForm()
    }

    // On form error
    _onFormError = (action:Action) => {
        if(action.type === userConstants._action.ERROR_EDIT){
            let errorMessage: string
            switch (action.data) {
                case userConstants._actionError.NO_CHANGE:
                    errorMessage = ``
                    break;
                case userConstants._actionError.EMAIL_ADDRESS_IS_NOT_VALID:
                    errorMessage = i18n.t('USER.EMAIL_ADDRESS_IS_NOT_VALID')
                    break;
                case userConstants._actionError.EMAIL_ALREADY_TAKEN:
                    errorMessage = i18n.t('USER.EMAIL_ALREADY_TAKEN')
                    break;
                case userConstants._actionError.REQUIRED_FIELDS_ARE_MISSING:
                    errorMessage = i18n.t('MAIN.REQUIRED_FIELDS_ARE_MISSING')
                    break;
                case userConstants._actionError.SERVER_NOT_RESPONDING:
                    errorMessage = i18n.t('MAIN.SERVER_NOT_RESPONDING')
                    break;   
                default:
                    errorMessage = i18n.t('MAIN.UNKNOWN_ERROR')
                    break;
            }

            this.setState({
                error: errorMessage
            })   
        }
    }
    
    // On submit
    submitTimout:any
    
    _submitForm = () => {
        clearTimeout(this.submitTimout)
        this.submitTimout = setTimeout(() => {
            let user:User = {
                email: this.state.user.email, 
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                age: this.state.user.age
            }
            UserAction.edit(user)

            this.setState({
                error: ''
            }) 
        }, 1000) 
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
                <Text>{i18n.t('USER.EMAIL')}</Text>
                <TextInput
                    keyboardType="email-address"
                    onChangeText={(email) => this._onEmailInputChange(email)}
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    value={this.state.user.email}
                />
                <Text>{i18n.t('USER.FIRST_NAME')}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(firstName) => this._onFirstNameInputChange(firstName)}
                    value={this.state.user.firstName}
                />
                <Text>{i18n.t('USER.LAST_NAME')}</Text>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(lastName) => this._onLastNameInputChange(lastName)}
                    value={this.state.user.lastName}
                />
                <Text>{i18n.t('USER.AGE')}</Text>
                <TextInput
                    keyboardType="numeric"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(age) => this._onAgeInputChange(age)}
                    value={this.state.user.age ? this.state.user.age.toString() : ''}
                />
                <Text>{this.state.error}</Text>


                <TouchableHighlight onPress={() => this._togglePasswordModal}>
                    <Text>{i18n.t('USER.CHANGE_PASSWORD')}</Text>
                </TouchableHighlight>

                <Modal transparent={true} visible={this.state.editPasswordModal}
                supportedOrientations={['portrait', 'landscape']} onOrientationChange={() => this._onOrientationchange}>
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            <EditPassword />
                            <TouchableHighlight onPress={() => this._togglePasswordModal}>
                                <Text>{i18n.t('MAIN.CLOSE')}</Text>
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