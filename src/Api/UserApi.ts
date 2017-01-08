import { Promise } from 'es6-promise'

//Constants
import { UserConstants } from '../Constants/User'

//Interfaces
import { User, NewUser, ApiUser } from '../Interfaces/User'
import { HttpError } from '../Interfaces/HttpError'


export class UserApi {
    apiAdaptator = (apiUser:ApiUser):User => {
        let user:User = {
            id: apiUser.id,
            firstName: apiUser.first_name,
            lastName: apiUser.last_name,
            email: apiUser.email,
            phone: apiUser.phone,
            age: apiUser.age,
            createdAt: apiUser.created_at,
            profilePictureUri: apiUser.profile_picture_uri,
            apiKey: apiUser.api_key
        }
        return user
    }
 
    createUser = (user:NewUser):Promise<User> => {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()

            let data = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                password: user.password,
                age: user.age,
            }

            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("POST", UserConstants._api.register, true)

            httpRequest.setRequestHeader("Content-type", "application/json")
            
            httpRequest.onload = () => {
                console.log(httpRequest.response)
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    try {
                        let error:HttpError = JSON.parse(httpRequest.response)
                        error.status = httpRequest.status
                        reject(error)
                    } catch (error) {
                        reject(UserConstants._actionError.SERVER_NOT_ANSWERING)
                    }
                }
            }

            httpRequest.onerror = () => {
                let error:HttpError = {
                    error: true,
                    status: 0,
                    message: 'Connection error'
                }
                reject(error)
            }

            httpRequest.send(dataJson)
        })
    }

    userLogin = (email:string, password:string):Promise<any> => {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            let data = {
                email: email,
                password: password
            }
                        
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("POST", UserConstants._api.login, true)

            httpRequest.setRequestHeader("Content-type", "application/json")

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    try {
                        let error:HttpError = JSON.parse(httpRequest.response)
                        error.status = httpRequest.status
                        reject(error)
                    } catch (error) {
                        reject(UserConstants._actionError.SERVER_NOT_ANSWERING)
                    }
                }
            }

            httpRequest.onerror = () => {
                let error:HttpError = {
                    error: true,
                    status: 0,
                    message: 'Connection error'
                }
                reject(error)
            }

            httpRequest.send(dataJson)
        })
    }

    getUserDetail = (apiKey:string):Promise<any> => {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            
            httpRequest.open("POST", UserConstants._api.details, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)
            
            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    try {
                        let error:HttpError = JSON.parse(httpRequest.response)
                        error.status = httpRequest.status
                        reject(error)
                    } catch (error) {
                        reject(UserConstants._actionError.SERVER_NOT_ANSWERING)
                    }
                }
            }

            httpRequest.onerror = () => {
                let error:HttpError = {
                    error: true,
                    status: 0,
                    message: 'Connection error'
                }
                reject(error)
            }
            
            httpRequest.send()
        })
    }

    editUser = (apiKey:string, user:User):Promise<any> => {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            let data = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                phone: user.phone,
                age: user.age
            }
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("PUT", UserConstants._api.edit, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    try {
                        let error:HttpError = JSON.parse(httpRequest.response)
                        error.status = httpRequest.status
                        reject(error)
                    } catch (error) {
                        reject(UserConstants._actionError.SERVER_NOT_ANSWERING)
                    }
                }
            }

            httpRequest.onerror = () => {
                let error:HttpError = {
                    error: true,
                    status: 0,
                    message: 'Connection error'
                }
                reject(error)
            }

            httpRequest.send(dataJson)
        })
    }

    editPassword = (apiKey:string, password:string, newPassword:string):Promise<any> => {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            let data = {
                old_password: password,     
                new_password: newPassword       
            }
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("PUT", UserConstants._api.editPassword, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let apiKey = data.api_key
                    resolve(apiKey)
                } else {
                    try {
                        let error:HttpError = JSON.parse(httpRequest.response)
                        error.status = httpRequest.status
                        reject(error)
                    } catch (error) {
                        reject(UserConstants._actionError.SERVER_NOT_ANSWERING)
                    }
                }
            }

            httpRequest.onerror = () => {
                let error:HttpError = {
                    error: true,
                    status: 0,
                    message: 'Connection error'
                }
                reject(error)
            }

            httpRequest.send(dataJson)
        })
    }
}

export default new UserApi()