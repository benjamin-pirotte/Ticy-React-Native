import React from 'react';
import AppDispatcher from '../build/Dispatcher/AppDispatcher'
import {UserStore} from '../build/Stores/User'
import userConstants from '../build/Constants/User'
 
const user = {   
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@fake.com',
    age: '22',
    apiKey: Math.random() * (100 - 1) + 1
}

it('create new user', (done) => { 
    const store = new UserStore();
    let newUser = user
    newUser['id'] = Math.random() * (100 - 1) + 1

    store.addChangeListener(() => {
        expect(store.getUser()).toEqual(newUser); 
        done();
    })

    AppDispatcher.handleViewAction({
        type: userConstants._action.LOGIN,    
        data: newUser
    })
});

it('login user infos', (done) => {
    const store = new UserStore();
    let newUser = user
    newUser['id'] = Math.random() * (100 - 1) + 1

    store.addChangeListener(() => {
        expect(store.getUser()).toEqual(newUser); 
        done();
    })

    AppDispatcher.handleViewAction({
        type: userConstants._action.LOGIN,    
        data: newUser
    })
});

it('edit user infos', (done) => {
    const store = new UserStore();
    let newUser = user
    newUser['id'] = Math.random() * (100 - 1) + 1

    store.addChangeListener(() => {
        expect(store.getUser()).toEqual(newUser); 
        done();
    })

    AppDispatcher.handleViewAction({
        type: userConstants._action.EDIT,    
        data: newUser
    })
});

it('edit user password', (done) => {
    const store = new UserStore();
    let apiKey = Math.random() * (100 - 1) + 1

    store.addChangeListener(() => {
        expect(store.getUser()['apiKey']).toEqual(apiKey); 
        done();
    })

    AppDispatcher.handleViewAction({
        type: userConstants._action.EDIT_PASSWORD,    
        data: {
            apiKey: apiKey
        }
    })
});

it('update user infos', (done) => {
    const store = new UserStore();
    store.updateUser(user)
    expect(store.getUser()).toEqual(user); 

    store.addChangeListener(() => {
        expect(store.getUser()).toEqual(user); 
        done();
    })

    AppDispatcher.handleViewAction({
        type: userConstants._action.UPDATE,
        data: user
    })
});


it('clear user infos', (done) => {
    const store = new UserStore();
    store.updateUser(user);
   
    store.addChangeListener(() => {
        expect(UserStore.getUser()).toEqual({}); 
        done();
    })

    AppDispatcher.handleViewAction({
        type: userConstants._action.LOGOUT 
    })  
});
