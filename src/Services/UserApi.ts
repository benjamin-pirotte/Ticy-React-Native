import { User, NewUser, ApiUser } from '../Interfaces/User'
import { MainConstants } from '../Constants/Main'
import { Promise } from 'es6-promise'

export default class UserApi {
    apiAdaptator(apiUser:ApiUser):User {
        let user = {
            id: apiUser.id,
            firstName: apiUser.first_name,
            lastName: apiUser.last_name,
            email: apiUser.email,
            phone: apiUser.phone,
            birthdate: apiUser.birthdate,
            createdAt: apiUser.created_at,
            apiKey: apiUser.api_key
        }
        return user
    }

    createUser(user:NewUser):Promise<any> {
        return new Promise(function (resolve, reject) {
            let httpRequest = new XMLHttpRequest()
            let url = MainConstants.apiUrl + '/user/register'
            let data = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                password: user.password,
                phone: user.phone,
                birthdate: user.birthdate
            }
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("POST", url, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

            httpRequest.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(httpRequest.response)
                } else {
                    reject({
                        status: this.status,
                        statusText: httpRequest.statusText
                    })
                }
            }

            httpRequest.onerror = function () {
                reject({
                    status: this.status,
                    statusText: httpRequest.statusText
                })
            }

            httpRequest.send(dataJson)
        })
    }
    userLogin(email:string, password:string):Promise<any> {
        let _this = this
        return new Promise(function (resolve, reject) {
            let httpRequest = new XMLHttpRequest()
            let url = MainConstants.apiUrl + '/user/login'
            let data = {
                email: email,
                password: password
            }

            let dataJson:String = 'email=' + email.toLowerCase().trim() + '&password=' + password
            
            httpRequest.open("POST", url, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

            httpRequest.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = _this.apiAdaptator(data)
                    resolve(user)
                } else {
                    reject(httpRequest.response)
                }
            }

            httpRequest.onerror = function () {
                reject({
                    status: this.status,
                    statusText: httpRequest.statusText
                })
            }

            httpRequest.send(dataJson)
        })
    }
    editUser(apiKey:string, user:User):Promise<any> {
        return new Promise(function (resolve, reject) {
            let httpRequest = new XMLHttpRequest()
            let url = MainConstants.apiUrl + '/user/edit'
            let data = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                phone: user.phone,
                birthdate: user.birthdate
            }
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("PUT", url, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)

            httpRequest.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(httpRequest.response)
                } else {
                    reject({
                        status: this.status,
                        statusText: httpRequest.statusText
                    })
                }
            }

            httpRequest.onerror = function () {
                reject({
                    status: this.status,
                    statusText: httpRequest.statusText
                })
            }

            httpRequest.send(dataJson)
        })
    }
    getUser(apiKey:string):Promise<any> {
        let _this = this
        return new Promise(function (resolve, reject) {
            let httpRequest = new XMLHttpRequest()
            let url = MainConstants.apiUrl + '/user/details'
            
            httpRequest.open("POST", url, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)
            
            httpRequest.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    let data = JSON.parse(httpRequest.response)
                    let user = _this.apiAdaptator(data)
                    resolve(user)
                } else {
                    reject(JSON.parse(httpRequest.response))
                }
            }

            httpRequest.onerror = function () {
                reject({
                    status: this.status,
                    statusText: httpRequest.statusText
                })
            }
            httpRequest.send()
        })
    }
    updatePassword(apiKey:string, password:string, password_copy:string):Promise<any> {
        return new Promise(function (resolve, reject) {
            let httpRequest = new XMLHttpRequest()
            let url = MainConstants.apiUrl + '/user/edit'
            let data = {
                password: password,
                password_copy: password_copy
            }
            let dataJson:String = JSON.stringify(data)
            
            httpRequest.open("PUT", url, true)

            httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
            httpRequest.setRequestHeader("Authorization", apiKey)

            httpRequest.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(httpRequest.response)
                } else {
                    reject({
                        status: this.status,
                        statusText: httpRequest.statusText
                    })
                }
            }

            httpRequest.onerror = function () {
                reject({
                    status: this.status,
                    statusText: httpRequest.statusText
                })
            }

            httpRequest.send(dataJson)
        })
    }
}