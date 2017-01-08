import { EventEmitter } from 'events'
import { AsyncStorage } from "react-native";  
import { Promise } from 'es6-promise'

//Dispatcher
import AppDispatcher from '../Dispatcher/AppDispatcher'

//Constants
import { UserConstants } from '../Constants/User'

//Interfaces
import { User, NewUser } from '../Interfaces/User'
import { Action, Payload } from '../Interfaces/Dispatcher'

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
        this.emit(ERROR_EVENT, action)
    }

    addErrorListener(callback:Function):void {
        this.on(ERROR_EVENT, callback)
    }

    removeErrorListener(callback:Function):void {
        this.removeListener(ERROR_EVENT, callback)
    }

    dispatcherIndex = AppDispatcher.register((payload:Payload) => {
            var action = payload.action
            switch(action.type) {
                case UserConstants._action.LOGIN:
                        this.updateUser(action.data)
                        this.emitChange()
                    break; 
                case UserConstants._action.ERROR_LOGIN:
                        this.emitError(action)
                    break; 
                case UserConstants._action.REGISTER:
                        this.updateUser(action.data)
                        this.emitChange()
                    break; 
                case UserConstants._action.ERROR_REGISTER:
                    this.emitError(action)
                break; 
                case UserConstants._action.UPDATE:
                        this.updateUser(action.data)
                        this.emitChange()
                    break; 
                case UserConstants._action.ERROR_UPDATE:
                        this.updateUser(action)
                        this.emitChange()
                    break; 
                case UserConstants._action.EDIT:
                        this.updateUser(action.data)
                        this.emitChange()
                    break;
                case UserConstants._action.ERROR_EDIT:
                    this.emitError(action)
                break;
                case UserConstants._action.EDITPASSWORD:
                        this.updateUserApiKey(action.data.apiKey)
                        this.emitChange()
                    break;
                case UserConstants._action.ERROR_EDITPASSWORD:
                    this.emitError(action)
                break;
                case UserConstants._action.LOGOUT:
                        this.clearUser()
                        this.emitChange()
                    break;
            }

            return true
    })
}

export default new UserStore()