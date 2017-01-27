import { EventEmitter } from 'events'
import { AsyncStorage } from "react-native";  

//Dispatcher
import {UserDispatcher, MainDispatcher} from '../Dispatcher/AppDispatcher'

//Constants
import userConstants from '../Constants/User' 

//Interfaces
import { User, NewUser } from '../Interfaces/User'
import { Action, Payload } from '../Interfaces/Dispatcher'

//Store
let CHANGE_EVENT = 'user_change'; 
let ERROR_EVENT = 'user_error_change';
let _user:User = {}

export class UserStore extends EventEmitter  {
    updateUser = (user:User) => {
        _user = user
        AsyncStorage.setItem('USER_API_KEY', _user.apiKey)
        AsyncStorage.setItem('USER_EMAIL', _user.email)
    }   

    updateUserApiKey = (apiKey:string) => {
        _user.apiKey = apiKey
        AsyncStorage.setItem('USER_API_KEY', _user.apiKey)
    }  

    getUser = ():User => {
        return _user
    }

    clearUser = () => {
        _user = {}
    }

    clearUserApi = () => {
        AsyncStorage.removeItem('USER_API_KEY')
    }

    // Event management
    emitChange = () => {
        this.emit(CHANGE_EVENT)
    }

    addChangeListener(callback:Function):void {
        this.on(CHANGE_EVENT, callback)
    }

    removeChangeListener(callback:Function):void {
        this.removeListener(CHANGE_EVENT, callback)
    }

    emitError = (action?:Action) => {
        if(action.data === userConstants._actionError.SERVER_NOT_RESPONDING){
            MainDispatcher.handleViewAction({
                type: userConstants._actionError.SERVER_NOT_RESPONDING
            })
            return
        }

        this.emit(ERROR_EVENT, action)
    }

    addErrorListener(callback:Function):void {
        this.on(ERROR_EVENT, callback)
    }

    removeErrorListener(callback:Function):void {
        this.removeListener(ERROR_EVENT, callback)
    }

    dispatcherIndex = UserDispatcher.register((payload:Payload) => {
            var action = payload.action
            switch(action.type) {
                case userConstants._action.LOGIN:
                        this.updateUser(action.data)
                        this.emitChange()
                    break; 
                case userConstants._action.ERROR_LOGIN:
                        this.emitError(action)
                    break; 
                case userConstants._action.REGISTER:
                        this.updateUser(action.data)
                        this.emitChange()
                    break; 
                case userConstants._action.ERROR_REGISTER:
                    this.emitError(action)
                break; 
                case userConstants._action.UPDATE:
                        this.updateUser(action.data)
                        this.emitChange()
                    break; 
                case userConstants._action.ERROR_UPDATE:
                        this.emitError(action)
                        this.emitChange()
                    break; 
                case userConstants._action.EDIT:
                        this.updateUser(action.data)
                        this.emitChange()
                    break;
                case userConstants._action.ERROR_EDIT:
                    this.emitError(action)
                break;
                case userConstants._action.EDIT_PASSWORD:
                        this.updateUserApiKey(action.data.apiKey)
                        this.emitChange()
                    break;
                case userConstants._action.ERROR_EDIT_PASSWORD:
                    this.emitError(action)
                break;
                case userConstants._action.LOGOUT:
                        this.clearUser()
                        this.clearUserApi()
                        this.emitChange()
                    break;
            }

            return true
    })
}

export default new UserStore()