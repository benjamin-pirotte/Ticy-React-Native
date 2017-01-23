// Constants
import  MainConstants, {apiError}  from './Main'

export const action = {
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
    EDIT: 'EDIT',
    EDIT_PASSWORD: 'EDIT_PASSWORD',
    UPDATE: 'UPDATE',
    LOGOUT: 'LOGOUT',
    ERROR_LOGIN: 'ERROR_LOGIN',
    ERROR_REGISTER: 'ERROR_REGISTER',
    ERROR_EDIT: 'ERROR_EDIT',
    ERROR_EDIT_PASSWORD: 'ERROR_EDIT_PASSWORD',
    ERROR_UPDATE: 'ERROR_UPDATE'
}

export const actionError = Object.assign({}, apiError, {
    EMAIL_ADDRESS_IS_NOT_VALID: 'EMAIL_ADDRESS_IS_NOT_VALID',
    REQUIRED_FIELDS_ARE_MISSING: 'REQUIRED_FIELDS_ARE_MISSING',
    CANT_RETURN_USER: 'CANT_RETURN_USER',
    EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',
    CANT_RETURN_API_KEY: 'CANT_RETURN_API_KEY',
    PASSWORDS_ARE_NOT_IDENTICAL: 'PASSWORDS_ARE_NOT_IDENTICAL'
})

export const apiUri = {
    register: MainConstants._apiUrl + '/user/register',
    login: MainConstants._apiUrl + '/user/login',
    edit: MainConstants._apiUrl + '/user/edit',
    editPassword: MainConstants._apiUrl + '/user/editpassword',
    details : MainConstants._apiUrl + '/user/details', 
}

export default {
    _action: action,
    _actionError : actionError,
    _api : apiUri
}

