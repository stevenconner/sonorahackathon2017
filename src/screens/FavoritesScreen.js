import React from 'react';

import { View, Text } from 'react-native';
import { Button, Header } from '../components/common';

class FavoritesScreen extends React.Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    centerText={'Favorites'}
                />    
                <Text>This is the favorites screen</Text>
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

export default FavoritesScreen;