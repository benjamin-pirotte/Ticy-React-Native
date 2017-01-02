import { User, NewUser, ApiUser } from '../Interfaces/User'
import { Promise } from 'es6-promise'

//Constants
import { APIUser } from '../Constants/User'

export default class UserApi {
    apiAdaptator(apiUser:ApiUser):User {
        let user:User = {
            id: apiUser.id,
            firstName: apiUser.first_name,
            lastName: apiUser.last_name,
            email: apiUser.email,
            phone: apiUser.phone,
            age: apiUser.age,
            birthdate: apiUser.birthdate,
            createdAt: apiUser.created_at,
            profilePictureUri: apiUser.profile_picture_uri,
            apiKey: apiUser.api_key
        }
        return user
    }

    createUser(user:NewUser):Promise<User> {
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
            
            httpRequest.open("POST", APIUser.register, true)

            httpRequest.setRequestHeader("Content-type", "application/json")
            

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    let response = JSON.parse(httpRequest.response)
                    response.status = httpRequest.status
                    reject(response)
                }
            }

            httpRequest.onerror = () => {
                let response = JSON.parse(httpRequest.response)
                response.status = httpRequest.status
                reject(response)
            }

            httpRequest.send(dataJson)
        })
    }

    userLogin(email:string, password:string):Promise<any> {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            let data = {
                email: email,
                password: password
            }

            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("POST", APIUser.login, true)

            httpRequest.setRequestHeader("Content-type", "application/json")

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    let response = JSON.parse(httpRequest.response)
                    response.status = httpRequest.status
                    reject(response)
                }
            }

            httpRequest.onerror = () => {
                let response = JSON.parse(httpRequest.response)
                response.status = httpRequest.status
                reject(response)
            }

            httpRequest.send(dataJson)
        })
    }

    getUserDetail(apiKey:string):Promise<any> {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            
            httpRequest.open("POST", APIUser.details, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)
            
            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    let response = JSON.parse(httpRequest.response)
                    response.status = httpRequest.status
                    reject(response)
                }
            }

            httpRequest.onerror = () => {
                let response = JSON.parse(httpRequest.response)
                response.status = httpRequest.status
                reject(response)
            }
            
            httpRequest.send()
        })
    }

    editUser(apiKey:string, user:User):Promise<any> {
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
            
            httpRequest.open("PUT", APIUser.edit, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = this.apiAdaptator(data)
                    resolve(user)
                } else {
                    let response = JSON.parse(httpRequest.response)
                    response.status = httpRequest.status
                    reject(response)
                }
            }

            httpRequest.onerror = () => {
                reject({
                    status: httpRequest.status,
                    statusText: httpRequest.statusText
                })
            }

            httpRequest.send(dataJson)
        })
    }

    editPassword(apiKey:string, password:string, password_copy:string):Promise<any> {
        return new Promise((resolve, reject) => {
            let httpRequest = new XMLHttpRequest()
            let data = {
                password: password,
                password_copy: password_copy
            }
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("PUT", APIUser.editPassword, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)

            httpRequest.onload = () => {
                if (httpRequest.status >= 200 && httpRequest.status < 300) {
                    resolve(httpRequest.response)
                } else {
                    let response = JSON.parse(httpRequest.response)
                    response.status = httpRequest.status
                    reject(response)
                }
            }

            httpRequest.onerror = () => {
                let response = JSON.parse(httpRequest.response)
                response.status = httpRequest.status
                reject(response)
            }

            httpRequest.send(dataJson)
        })
    }
}