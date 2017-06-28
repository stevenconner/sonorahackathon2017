import React from "react";
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import { Routes } from "./src/nav/Router";
import getStore from "./src/state/Store";
import firebase from "firebase";

import { View, Text, BackHandler } from "react-native";

const AppNavigator = StackNavigator(Routes, {
    initialRouteName: "LoginScreen",
    headerMode: "screen",
    mode: "card",
    navigationOptions: {
        gesturesEnabled: false
    }
});

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

@connect(state => ({
    nav: state.nav
}))
class AppWithNavigationState extends React.Component {
    handleBackPress = () => {
        const { dispatch, nav } = this.props;
        const navigation = addNavigationHelpers({
            dispatch,
            state: nav
        });
        if (navigation.state.index === 1) return true;
        navigation.goBack();
        return true;
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillMount() {
        this.firebaseConfig();
    }

    firebaseConfig() {
        const config = {
            apiKey: "AIzaSyBJhHe9F-uBPEVrxeTRoi3TzIDvQM2ih1E",
            authDomain: "sermonaudiolog.firebaseapp.com",
            databaseURL: "https://sermonaudiolog.firebaseio.com",
            projectId: "sermonaudiolog",
            storageBucket: "sermonaudiolog.appspot.com",
            messagingSenderId: "73702239464"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

const store = getStore(navReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        );
    }
}

export default App;
