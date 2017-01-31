export const apiUrl = 'http://localhost:8888/v1'

export const apiError = {
    SERVER_NOT_RESPONDING: 'SERVER_NOT_RESPONDING',
    NO_API_KEY: 'NO_API_KEY',
    INVALID_AUTHORIZATION: 'INVALID_AUTHORIZATION',
    NO_AUTHORIZATION: 'NO_AUTHORIZATION',
    REQUIRED_FIELDS_ARE_MISSING: 'REQUIRED_FIELDS_ARE_MISSING',
    INCORRECT_CREDENTIALS: 'INCORRECT_CREDENTIALS',
    NO_CHANGE: 'NO_CHANGE',
    FAILED_TO_UPDATE: 'FAILED_TO_UPDATE',
}

export const notifcation = {
    timeOut: 10000
}

export default {
    _apiUrl: apiUrl,
    _apiError: apiError,
    _notifcation: notifcation
}