import AppDispatcher from '../Dispatcher/AppDispatcher'
import { UserConstants } from '../Constants/User'
import { User } from '../Interfaces/User'

export default class UserActions {

  loginUser(email:String, password:String):void {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.ACTION_LOGIN,
      data: {
          email: email, 
          password: password
      }
    })
  }

  editUser(user:User):void {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.ACTION_EDIT,
      data: {
          user: user
      }
    })
  }

  logoutUser():void {
    AppDispatcher.handleViewAction({
      actionType: UserConstants.ACTION_LOGOUT,
      data: {}
    })
  }
}
