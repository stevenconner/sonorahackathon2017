import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../actions'
import { NavigationActions } from 'react-navigation';

import { View, Text } from 'react-native';
import { Button, Header } from '../components/common';

class SettingsScreen extends React.Component {

    handleLogOut() {
        this.props.logOut();
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' })
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    centerText={'Settings'}
                />    
                <Text>This is the settings screen</Text>
                <Button
                    style={{ borderColor: '#a00' }}
                    textStyle={{ color: '#a00' }}
                    onPress={() => this.handleLogOut()}
                >
                    Log Out
                </Button>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
    }
}

const mapStateToProps = state => {
    const { user } = state.auth;
    return { user };
}

export default connect(mapStateToProps, { logOut })(SettingsScreen);