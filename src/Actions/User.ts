import { AsyncStorage } from "react-native"; 

// Dispatchers
import AppDispatcher from '../Dispatcher/AppDispatcher'

//Services
import UserApi from '../Api/UserApi'

// Constants
import { UserConstants } from '../Constants/User'

// Interfaces
import { User, NewUser } from '../Interfaces/User'

export class UserActions {
  login = (email:string, password:string) => {
    UserApi.userLogin(email, password).then((user:User) => {
      AppDispatcher.handleViewAction({
        type: UserConstants._action.LOGIN,
        data: user
      })
    }, (error:any) => {
      let errorMessage = error['message']
      AppDispatcher.handleViewAction({
        type: UserConstants._action.ERROR_LOGIN,
        data: errorMessage
      })
    })
  }

  register = (user:NewUser) => {
    UserApi.createUser(user).then((user:User) => {
      AppDispatcher.handleViewAction({
        type: UserConstants._action.REGISTER,
        data: user
      })
    }, (error:any) => {
      let errorMessage = error['message']
      AppDispatcher.handleViewAction({
        type: UserConstants._action.ERROR_REGISTER,
        data: errorMessage
      })
    })
  }

  edit = (user:User) => {
    AsyncStorage.getItem('USER_API_KEY', (err, apiKey) => {
      if(apiKey) {
          UserApi.editUser(apiKey, user).then((user:User) => {
            AppDispatcher.handleViewAction({
              type: UserConstants._action.EDIT,
              data: user
            })
          }, (error:any) => {
            let errorMessage = error['message']
            AppDispatcher.handleViewAction({
              type: UserConstants._action.ERROR_REGISTER,
              data: errorMessage
            })
          })
      } else {
        let errorMessage = UserConstants._actionError.NO_API_KEY
        AppDispatcher.handleViewAction({
          type: UserConstants._action.ERROR_REGISTER,
          message: errorMessage
        })
      }
    })
  }

  editPassword = (oldPassword:string, newPassword:string) => {
    AsyncStorage.getItem('USER_API_KEY', (err, apiKey) => {
      if(apiKey) {
          UserApi.editPassword(apiKey, oldPassword, newPassword).then((apiKey:string) => {
            AppDispatcher.handleViewAction({
              type: UserConstants._action.EDITPASSWORD,
              data: {
                apiKey: apiKey
              }
            })
          }, (error:any) => {
            let errorMessage = error['message']
            AppDispatcher.handleViewAction({
              type: UserConstants._action.ERROR_REGISTER,
              data: errorMessage
            })
          })
      } else {
        let errorMessage = UserConstants._actionError.NO_API_KEY
        AppDispatcher.handleViewAction({
          type: UserConstants._action.ERROR_REGISTER,
          data: errorMessage
        })
      }
    })
  }

  update = () => {
    AsyncStorage.getItem('USER_API_KEY', (err, result) => {
      if(result){
          console.log(result)
          UserApi.getUserDetail(result).then((user:User) => {
            console.log(user)
            AppDispatcher.handleViewAction({
              type: UserConstants._action.UPDATE,
              data: user
            })
          }, (error:any) => {
            console.log(error)
            AppDispatcher.handleViewAction({
              type: UserConstants._action.LOGOUT
            })
          })
        } else {
          AppDispatcher.handleViewAction({
            type: UserConstants._action.LOGOUT
          })
        }
    })
  }

  logOut = () => {
    AppDispatcher.handleViewAction({
      type: UserConstants._action.LOGOUT
    })
  }
}

export default new UserActions()