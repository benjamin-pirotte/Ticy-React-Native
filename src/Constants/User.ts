// Constants
import  MainConstants  from './Main'

const UserConstants = {
    _action : {
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
    },
    _actionError : Object.assign({}, MainConstants.apiError, {
        EMAIL_ADDRESS_IS_NOT_VALID: 'EMAIL_ADDRESS_IS_NOT_VALID',
        REQUIRED_FIELDS_ARE_MISSING: 'REQUIRED_FIELDS_ARE_MISSING',
        CANT_RETURN_USER: 'CANT_RETURN_USER',
        EMAIL_ALREADY_TAKEN: 'EMAIL_ALREADY_TAKEN',
        CANT_RETURN_API_KEY: 'CANT_RETURN_API_KEY',
        PASSWORDS_ARE_NOT_IDENTICAL: 'PASSWORDS_ARE_NOT_IDENTICAL'
    }),
    _api : {
        register: MainConstants.apiUrl + '/user/register',
        login: MainConstants.apiUrl + '/user/login',
        edit: MainConstants.apiUrl + '/user/edit',
        editPassword: MainConstants.apiUrl + '/user/editpassword',
        details : MainConstants.apiUrl + '/user/details', 
    }
}

export default UserConstants