import React from 'react';

import { View, Text, TouchableWithoutFeedback } from 'react-native';

class PlaylistItem extends React.Component {
    render() {
        let { date, length, series, speaker, title, url } = this.props.item;

        return (
            <TouchableWithoutFeedback style={styles.touchableStyle} onPress={this.props.onPress}>
                <View style={styles.viewStyle}>
                    <Text style={styles.speakerStyle}>{speaker}</Text>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.lengthStyle}>{length}</Text>
                        <Text style={styles.dateStyle}>{date}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = {
    touchableStyle: {
    },
    viewStyle: {
        borderBottomWidth: 1,
        borderColor: "#eee",
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingBottom: 5,
    },
    titleStyle: {
        fontSize: 18,
        marginVertical: 5,
    },
    speakerStyle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    lengthStyle: {
        marginHorizontal: 10,
        color: '#555'
    },
    dateStyle: {
        marginHorizontal: 10,
        color: '#555'
    }
};

export default PlaylistItem;