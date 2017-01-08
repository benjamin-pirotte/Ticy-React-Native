// Constants
import { MainConstants } from './Main'

export const UserConstants = {
    _action : {
        LOGIN: 'LOGIN',
        REGISTER: 'REGISTER',
        EDIT: 'EDIT',
        EDITPASSWORD: 'EDIT_PASSWORD',
        UPDATE: 'UPDATE',
        LOGOUT: 'LOGOUT',
        ERROR_LOGIN: 'ERROR_LOGIN',
        ERROR_REGISTER: 'ERROR_REGISTER',
        ERROR_EDIT: 'ERROR_EDIT',
        ERROR_EDITPASSWORD: 'ERROR_EDIT_PASSWORD',
        ERROR_UPDATE: 'ERROR_UPDATE'
    },
    _actionError : {
        SERVER_NOT_ANSWERING: 'SERVER_NOT_ANSWERING',
        NO_API_KEY: 'NO_API_KEY',
        INVALID_AUTHORIZATION: 'INVALID_AUTHORIZATION',
        NO_AUTHORIZATION: 'NO_AUTHORIZATION',
        EMAIL_ADDRESS_IS_NOT_VALID: 'EMAIL_ADDRESS_IS_NOT_VALID',
        REQUIRED_FIELDS_ARE_MISSING: 'REQUIRED_FIELDS_ARE_MISSING',
        CANT_RETURN_USER: 'CANT_RETURN_USER',
        EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',
        INCORRECT_CREDENTIALS: 'INCORRECT_CREDENTIALS',
        NO_CHANGE: 'NO_CHANGE',
        FAILED_TO_UPDATE: 'FAILED_TO_UPDATE'
    },
    _api : {
        register: MainConstants.apiUrl + '/user/register',
        login: MainConstants.apiUrl + '/user/login',
        edit: MainConstants.apiUrl + '/user/edit',
        editPassword: MainConstants.apiUrl + '/user/editpassword',
        details : MainConstants.apiUrl + '/user/details', 
    }
}