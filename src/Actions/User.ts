import { AsyncStorage } from "react-native"; 

// Dispatchers
import AppDispatcher from '../Dispatcher/AppDispatcher'

//Services
import UserApi from '../Api/UserApi'

// Constants
import userConstants from '../Constants/User'

// Interfaces
import { User, NewUser } from '../Interfaces/User'
import { HttpError } from '../Interfaces/Http'

//Actions
export class UserActions {
  login = async (email:string, password:string) => {
    try {
      const user:User = await UserApi.userLogin(email, password)
      AppDispatcher.handleViewAction({
        type: userConstants._action.LOGIN,    
        data: user
      })
    } catch (error) {
      const errorMessage = error.message
      AppDispatcher.handleViewAction({
        type: userConstants._action.ERROR_LOGIN,
        data: errorMessage
      })
    }
  }

  register = async (user:NewUser) => {
    try {
       const newUser:User = await UserApi.createUser(user)
        AppDispatcher.handleViewAction({
          type: userConstants._action.REGISTER,
          data: newUser
        })
    } catch (error){
      const errorMessage = error.message
      AppDispatcher.handleViewAction({
        type: userConstants._action.ERROR_REGISTER,
        data: errorMessage
      })
    }
  }

  edit = async (user:User) => {
    let apiKey:string

    let saveUser =  async () => {
      try {
        const newUser:User = await UserApi.editUser(apiKey, user)
        AppDispatcher.handleViewAction({
          type: userConstants._action.EDIT,
          data: newUser
        })
      } catch (error) {
        let errorMessage = error.message
        AppDispatcher.handleViewAction({
          type: userConstants._action.ERROR_EDIT,
          data: errorMessage
        })
      }
    }

    try {
      apiKey = await AsyncStorage.getItem('USER_API_KEY')
    } catch (error) {
      this.logOut()
    }

    if(apiKey) {
      saveUser()
    } else {
      this.logOut()
    }
  }

  editPassword = async (oldPassword:string, password:string, passwordCopy:string) => {
    let apiKey:string

    let savePwd = async () => {
      try {
        const newApiKey:string = await UserApi.editPassword(apiKey, oldPassword, password, passwordCopy)
        AppDispatcher.handleViewAction({
          type: userConstants._action.EDIT_PASSWORD,
          data: {
            apiKey: newApiKey
          }
        })
      } catch (error) {
        let errorMessage = error.message
        AppDispatcher.handleViewAction({
          type: userConstants._action.ERROR_EDIT_PASSWORD,
          data: errorMessage
        })
      }
    }

    apiKey = await AsyncStorage.getItem('USER_API_KEY')
    
    if(apiKey) {
      savePwd()
    } else {
      this.logOut()
    }
  }

  update = async () => {
    let apiKey:string

    let update = async () => {
      try {
          const newUser:User = await UserApi.getUserDetail(apiKey)
          AppDispatcher.handleViewAction({
            type: userConstants._action.UPDATE,
            data: newUser
          })
      } catch (error) {
          let errorMessage = error.message
          AppDispatcher.handleViewAction({
            type: userConstants._action.ERROR_UPDATE,
            data: errorMessage
          })
      }
    }

    apiKey = await AsyncStorage.getItem('USER_API_KEY')

    if(apiKey) {
      update()
    } else {
      this.logOut()
    }
  }

  logOut = () => {
    AppDispatcher.handleViewAction({
      type: userConstants._action.LOGOUT
    })
  }
}

export default new UserActions()