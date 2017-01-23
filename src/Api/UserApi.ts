//Constants
import userConstants from '../Constants/User'

//Interfaces
import { User, NewUser, ApiUser } from '../Interfaces/User'
import { HttpError } from '../Interfaces/Http'

let serverNotResponding = () => {
    return {
        status: 0,
        message: userConstants._actionError.SERVER_NOT_RESPONDING
    }
}
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
                password_copy: user.passwordCopy,
                age: user.age,
            }

            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("POST", userConstants._api.register, true)

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
                        reject(serverNotResponding())
                    }
                }
            }

            httpRequest.onerror = () => {
                reject(serverNotResponding())
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
            
            httpRequest.open("POST", userConstants._api.login, true)

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
                        reject(serverNotResponding())
                    }
                }
            }

            httpRequest.onerror = () => {
                reject(serverNotResponding())
            }

            httpRequest.send(dataJson)
        })
    }

    getUserDetail = (apiKey:string):Promise<any> => {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            
            httpRequest.open("POST", userConstants._api.details, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)
            
            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    try {
                        let error = JSON.parse(httpRequest.response)
                        error.status = httpRequest.status
                        reject(error)
                    } catch (error) {
                        reject(serverNotResponding())
                    }
                }
            }

            httpRequest.onerror = () => {
                reject(serverNotResponding())
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
            
            httpRequest.open("PUT", userConstants._api.edit, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    try {
                        let error = JSON.parse(httpRequest.response)
                        error.status = httpRequest.status
                        reject(error)
                    } catch (error) {
                        reject(serverNotResponding())
                    }
                }
            }

            httpRequest.onerror = () => {
                reject(serverNotResponding())
            }

            httpRequest.send(dataJson)
        })
    }

    editPassword = (apiKey:string, oldPassword:string, password:string, passwordCopy:string):Promise<any> => {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            let data = {
                old_password: oldPassword,     
                password: password,
                password_copy: passwordCopy      
            }
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("PUT", userConstants._api.editPassword, true)

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
                        reject(serverNotResponding())
                    }
                }
            }

            httpRequest.onerror = () => {
                reject(serverNotResponding())
            }

            httpRequest.send(dataJson)
        })
    }
}

export default new UserApi()