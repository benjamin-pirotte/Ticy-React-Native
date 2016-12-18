import { EventEmitter } from 'events'
import { AsyncStorage } from "react-native";  
import { Promise } from 'es6-promise'

import AppDispatcher from '../Dispatcher/AppDispatcher'
import UserApiService from '../Services/UserApi'

import { UserConstants } from '../Constants/User'
import { User } from '../Interfaces/User'


interface Payload {
    action: {
        type: String,
        data?: any
    }
}

let CHANGE_EVENT = 'change';
let _user:User = {}
const userApi = new UserApiService()

export class UserStore extends EventEmitter  {
    _user:User = {}
    // User handler
    userIsLogged():Promise<String> {
        let _this = this
        return new Promise(function (resolve, reject) {
            AsyncStorage.getItem('USER_API_KEY', (err, result) => {
                if(result){
                    userApi.getUser(result).then(function(user:User){
                        _user = user
                        _this.emitChange()
                        resolve('isLogged')
                    }, function(result:any){
                        _user = {}
                        _this.emitChange()
                        reject('credentialsNotValid')
                    })
                }else {
                    _user = {}
                    reject('noCredentials')

                    _this.emitChange()
                }
            })
        })
    }
    loginUser(email:string, pwd:string):Promise<Object> {
        return new Promise(function (resolve, reject) {
             userApi.userLogin(email, pwd).then(function(user:User){
                 _user = user
                 AsyncStorage.setItem('USER_API_KEY', user.apiKey)
                 resolve('success')
             }, function(response){
                let errorMessage = JSON.parse(response)
                reject(errorMessage['message'])
             })
        })
    }
    updateUser():User { 
        return _user
    }
    getUser():User {
        return _user
    }
    editUser(user:User) {
        _user = user
    }
    logOut():void {
        _user = {}
    }

    // Event management
    emitChange():void {
        this.emit(CHANGE_EVENT)
    }
    addChangeListener(callback:Function):void {
        this.on(CHANGE_EVENT, callback)
    }
    removeChangeListener(callback:Function):void {
        this.removeListener(CHANGE_EVENT, callback)
    }

    dispatcherIndex = AppDispatcher.register(function(payload:Payload) {
            var action = payload.action
            
            switch(action.type) {
                case UserConstants.ACTION_LOGIN:
                        this.loginUser(action.data.name, action.data.password)
                        AsyncStorage.setItem('USER_API_KEY', _user.apiKey)
                        this.emitChange()
                    break;
                case UserConstants.ACTION_EDIT:
                        this.loginUser(action.data)
                        this.emitChange()
                    break;
                case UserConstants.ACTION_LOGOUT:
                        this.logOut()
                        AsyncStorage.setItem('USER_API_KEY', null)
                        this.emitChange()
                    break;
            }

            return true
    })
}

export default new UserStore()