import firebase from 'firebase';
import { PULL_LIST, WATCH_DB } from './types';

export const pullList = () => {
    let { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/user/${currentUser.uid}/list`)
            .on('value', snapshot => {
                dispatch({ type: PULL_LIST, payload: snapshot.val() })
            })
    }
}

export const watchDB = () => {
    return (dispatch) => {
        firebase.database().ref(`/sermon`)
            .once('value').then(snapshot => {
                dispatch({
                    type: WATCH_DB,
                    payload: snapshot.val(),
                })
            })
    }
}

export const markAsListened = (listitemid) => {
    let { currentUser } = firebase.auth();
    console.log('markaslistened fired!');

    return (dispatch) => {
        firebase.database().ref(`/user/${currentUser.uid}/list/${listitemid}`).update({ listened: 1 })
    }
}