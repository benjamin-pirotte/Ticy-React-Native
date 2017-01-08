export interface Action {
    type: String
    data?: any
}

export interface Payload {
    action: Action
}