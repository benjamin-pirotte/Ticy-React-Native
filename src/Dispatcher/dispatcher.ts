import { Promise }  from 'es6-promise';

export default class Dispatcher {
  callbacks:Array<Function> = []
  promises:Array<any> = []

  register(callback:Function) {
    this.callbacks.push(callback)
    return this.callbacks.length - 1
  }

  dispatch(payload:Object) {
    var resolves:Array<any> = []
    var rejects:Array<any> = []

    this.promises = this.callbacks.map(function(_, i) {
      return new Promise(function(resolve, reject){
        resolves[i] = resolve
        rejects[i] = reject
      })
    })

    this.callbacks.forEach(function(callback, i) {
      Promise.resolve(callback(payload)).then(function() {
        resolves[i](payload)
      }, function() {
        rejects[i](new Error('Dispatcher callback unsuccessful'))
      })
    })

    this.promises = []
  }
}

