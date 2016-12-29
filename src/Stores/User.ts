import { EventEmitter } from 'events'
import { AsyncStorage } from "react-native";  
import { Promise } from 'es6-promise'

//Dispatcher
import AppDispatcher from '../Dispatcher/AppDispatcher'

//Services
import UserApiService from '../Services/UserApi'

//Constants
import { UserConstants } from '../Constants/User'

//Interfaces
import { User, NewUser } from '../Interfaces/User'


interface Payload {
    action: {
        type: String
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
                    userApi.getUserDetail(result).then(function(user:User){
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
    loginUser(email:string, password:string, ):Promise<Object> {
        let _this = this
        return new Promise(function (resolve, reject) {
             userApi.userLogin(email, password).then(function(user:User){
                 _user = user
                 AsyncStorage.setItem('USER_API_KEY', user.apiKey)
                 resolve('success')
                 _this.emitChange()
             }, function(response){
                reject(response)
             })
        })
    }
    register(user:NewUser):Promise<Object> {
        let _this = this
        return new Promise(function (resolve, reject) {
            userApi.createUser(user).then(function(user:User){
                 if(!user.id) {
                     reject('An error occured, try to login with your credential')
                     return false
                 } 
                 _user = user
                 AsyncStorage.setItem('USER_API_KEY', user.apiKey)
                 resolve('success')
                 _this.emitChange()
             }, function(response){
                reject(response)
             })
        })
    }
    updateUser() { 
        AsyncStorage.getItem('USER_API_KEY', (err, result) => {
            if(result){
                userApi.getUserDetail(result).then(function(user:User){
                    _user = user
                    this.emitChange()
                })
            } else {
                _user = {}
                this.emitChange()
            }
        })
    }
    getUser():User {
        return _user
    }
    editUser(user:User):Promise<String> {
        let _this = this
        return new Promise(function (resolve, reject) {
            AsyncStorage.getItem('USER_API_KEY', (err, apiKey) => {
                if(apiKey) {
                    userApi.editUser(apiKey, user).then(function(user:User){
                        _user = user
                        _this.emitChange()
                        resolve('UserUpdated')
                    }, function(result:any){
                        reject(result)
                    })
                } else {
                    _user = {}
                    reject('NoApiKey')
                    _this.emitChange()
                }
            })
        })
    }
    logOut():void {
        AsyncStorage.removeItem('USER_API_KEY')
        _user = {}

        this.emitChange()
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