import Dispatcher from './Dispatcher'

class AppDispatcher extends Dispatcher {
  handleViewAction(action:Object):void {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    }) 
  }
}

export const MainDispatcher = new AppDispatcher()
export const UserDispatcher = new AppDispatcher()

