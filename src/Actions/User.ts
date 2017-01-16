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
  login = (email:string, password:string) => {
    UserApi.userLogin(email, password).then((user:User) => {
      AppDispatcher.handleViewAction({
        type: userConstants._action.LOGIN,
        data: user
      })
    }, (error:HttpError) => {
      let errorMessage = error.message
      AppDispatcher.handleViewAction({
        type: userConstants._action.ERROR_LOGIN,
        data: errorMessage
      })
    }) 
  }

  register = (user:NewUser) => {
    UserApi.createUser(user).then((user:User) => {
      AppDispatcher.handleViewAction({
        type: userConstants._action.REGISTER,
        data: user
      })
    }, (error:HttpError) => {
      let errorMessage = error.message
      AppDispatcher.handleViewAction({
        type: userConstants._action.ERROR_REGISTER,
        data: errorMessage
      })
    })
  }

  edit = (user:User) => {
    AsyncStorage.getItem('USER_API_KEY', (err, apiKey) => {
      if(apiKey) {
          UserApi.editUser(apiKey, user).then((user:User) => {
            AppDispatcher.handleViewAction({
              type: userConstants._action.EDIT,
              data: user
            })
          }, (error:HttpError) => {
            let errorMessage = error.message
            AppDispatcher.handleViewAction({
              type: userConstants._action.ERROR_EDIT,
              data: errorMessage
            })
          })
      } else {
        let errorMessage = userConstants._actionError.NO_API_KEY
        AppDispatcher.handleViewAction({
          type: userConstants._action.ERROR_EDIT,
          message: errorMessage
        })
      }
    })
  }

  editPassword = (oldPassword:string, password:string, passwordCopy:string) => {
    AsyncStorage.getItem('USER_API_KEY', (err, apiKey) => {
      if(apiKey) {
          UserApi.editPassword(apiKey, oldPassword, password, passwordCopy).then((apiKey:string) => {
            AppDispatcher.handleViewAction({
              type: userConstants._action.EDIT_PASSWORD,
              data: {
                apiKey: apiKey
              }
            })
          }, (error:HttpError) => {
            let errorMessage = error.message
            AppDispatcher.handleViewAction({
              type: userConstants._action.ERROR_EDIT_PASSWORD,
              data: errorMessage
            })
          })
      } else {
        let errorMessage = userConstants._actionError.NO_API_KEY
        AppDispatcher.handleViewAction({
          type: userConstants._action.ERROR_REGISTER,
          data: errorMessage
        })
      }
    })
  }

  update = () => {
    AsyncStorage.getItem('USER_API_KEY', (err, result) => {
      if(result){
          UserApi.getUserDetail(result).then((user:User) => {
            AppDispatcher.handleViewAction({
              type: userConstants._action.UPDATE,
              data: user
            })
          }, (error:HttpError) => {
            AppDispatcher.handleViewAction({
              type: userConstants._action.LOGOUT
            })
          })
        } else {
          AppDispatcher.handleViewAction({
            type: userConstants._action.LOGOUT
          })
        }
    })
  }

  logOut = () => {
    AppDispatcher.handleViewAction({
      type: userConstants._action.LOGOUT
    })
  }
}

export default new UserActions()