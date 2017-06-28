import React from 'react';
import Expo from 'expo';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { loggedIn, watchDB } from '../actions';

import { View, Text } from 'react-native';
import { Button } from '../components/common';


class LoginScreen extends React.Component {
    state = {
        loggedIn: false,
        textbox: '',
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.props.loggedIn(user);
                console.log('logged in to firebase!', user);
                this.props.navigation.navigate('Tabs')
            }
        })
    }

    componentDidMount() {
        this.props.watchDB()
    }

    async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: '73702239464-pnprpstnajsdpbeno3mdhj3macvp5g5s.apps.googleusercontent.com',
                iosClientId: '73702239464-7tr2f9al0lke4ej0n3akbiar8gl6292e.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });
            if (result.type === 'success') {
                console.log('here is the result', result);
                this.authGoogle(result.idToken);
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    async logIn() {
        const {
            type,
            token
        } = await Expo.Facebook.logInWithReadPermissionsAsync("239841473178566", {
            permissions: ["public_profile"]
        });
        if (type === "success") {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(
                `https://graph.facebook.com/me?access_token=${token}`
            );
            console.log('here is the response from facebook', await response.json())
            this.authenticate(token)
        }
    }

    authGoogle = (token) => {
        const provider = firebase.auth.GoogleAuthProvider
        const credential = provider.credential(token)
        return firebase.auth().signInWithCredential(credential)
    }

    authenticate = (token) => {
        const provider = firebase.auth.FacebookAuthProvider
        const credential = provider.credential(token)
        return firebase.auth().signInWithCredential(credential)
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Button
                    onPress={() => this.logIn()}
                    style={{ borderColor: '#007aff', marginBottom: 10 }}
                    textStyle={{ color: '#007aff' }}
                >
                    Log In With Facebook
                </Button>
                <Button
                    onPress={() => this.signInWithGoogleAsync()}    
                    style={{ borderColor: 'red' }}
                    textStyle={{ color: 'red' }}
                >
                    Log In With Google
                </Button>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

export default connect(null, { loggedIn, watchDB })(LoginScreen);