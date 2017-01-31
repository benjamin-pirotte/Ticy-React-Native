export interface Dispatcher {
    register: (callback:Function) => void 
    dispatch: (payload:Object) => void
    handleViewAction: (action:Action) => void
}

export interface Action {
    type: String
    data?: any
}

export interface Payload {
    action: Action
}