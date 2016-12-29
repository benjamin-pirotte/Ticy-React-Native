// Constants
import { MainConstants } from './Main'

export const APIUser = {
    register: MainConstants.apiUrl + '/user/register',
    login: MainConstants.apiUrl + '/user/login',
    edit: MainConstants.apiUrl + '/user/edit',
    editPassword: MainConstants.apiUrl + '/user/editpassword',
    details : MainConstants.apiUrl + '/user/details', 
}

export const UserConstants = {
    ACTION_LOGIN: 'loginUser',
    ACTION_EDIT: 'editUser',
    ACTION_LOGOUT: 'logoutUser'
}