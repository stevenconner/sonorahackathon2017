import React from 'react';
import { connect } from 'react-redux';
import { pullList } from '../actions';
import _ from 'lodash';

import { View, Text, FlatList } from 'react-native';
import { Button, Header } from '../components/common';
import PlaylistItem from '../components/PlaylistItem';


class ListScreen extends React.Component {
    componentWillMount() {
        this.props.pullList();
    }

    componentDidUpdate() {
        console.log('here is props on list screen', this.props);
    }

    renderItem(item) {
        return <PlaylistItem item={item[0]} onPress={() => this.props.navigation.navigate('PlayerScreen', { item: item })} />
    }

    _keyExtractor = (item, index) => item[1];

    render() {
        return (
            <View style={styles.containerStyle}>
                <Header
                    centerText={'Playlist'}
                />    
                <FlatList
                    data={this.props.builtlist}
                    renderItem={({ item }) => this.renderItem(item)}
                    keyExtractor={this._keyExtractor}
                />
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
    const { playlist, db } = state.list;
    let builtlist = [];
    const newplaylist = _.map(playlist, (val, uid) => {
        return { ...val, uid }
    })
    for (i = newplaylist.length - 1; i >= 0; i -= 1) {
        let item = newplaylist[i].sermon;
        let pushitem = [db[item.speakerID][item.sermonID], item.sermonID, newplaylist[i].uid]
        builtlist.push(pushitem)
    }
    console.log('here is builtlist', builtlist);
    return { builtlist };
}

export default connect(mapStateToProps, { pullList })(ListScreen);