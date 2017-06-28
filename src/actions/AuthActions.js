import firebase from 'firebase';
import { LOGGED_IN, LOG_OUT } from './types';

export const loggedIn = (user) => {
    return (dispatch) => {
        console.log('here is the user', user);
        dispatch({ type: LOGGED_IN, payload: user })
    }
}

export const logOut = () => {
    return (dispatch) => {
        console.log('user is logging out!');
        dispatch({ type: LOG_OUT })

        firebase.auth().signOut();
    }
}