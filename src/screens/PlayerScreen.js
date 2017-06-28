import React from 'react';
import Expo from 'expo';
import { connect } from 'react-redux';
import { markAsListened } from '../actions';

import { View, Text, ActivityIndicator, Slider } from 'react-native';
import { Icon } from 'react-native-elements';
import { Header, Button } from '../components/common';

class PlayerScreen extends React.Component {
    state = {
        audioFile: null,
        playing: false,
        length: 0,
        position: 0,
    }

    componentDidMount() {
        this.loadFile();
    }

    componentWillUnmount() {
        this.state.audioFile.unloadAsync();
    }

    _callback(status) {
        if (status.didJustFinish) {
            this.props.markAsListened(this.props.navigation.state.params.item[2])
        }
        this.setState({
            length: status.durationMillis,
            position: status.positionMillis
        })
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getTimestamp() {
        if (this.state.length != 0) {
            return (
                `${this._getMMSSFromMillis(this.state.position)} / ${this._getMMSSFromMillis(this.state.length)}`
            )
        }
    }

    async loadFile() {
        let id = this.props.navigation.state.params.item[1]
        const soundObject = new Expo.Audio.Sound();
        soundObject.setCallback(this._callback.bind(this))
        try {
            await soundObject.loadAsync({ uri: `https://media-proxy-1.sermonaudio.com/audio/${id}.mp3` }).then(this.setState({
                audioFile: soundObject
        }))
        } catch (error) {  
            console.log('omg an error', error);    
        }
    }

    handlePlayPress() {
        this.state.audioFile.playAsync();
        this.setState({
            playing: true
        })
    }

    handlePausePress() {
        this.state.audioFile.pauseAsync();
        this.setState({
            playing: false
        })
    }

    async back10s() {
        let thing = await this.state.audioFile.getStatusAsync();
        console.log('here is the thing', thing);
        let pos = thing.positionMillis;
        let newPos = pos - 10000
        this.state.audioFile.setPositionAsync(newPos)
    }

    async back30s() {
        let thing = await this.state.audioFile.getStatusAsync();
        let pos = thing.positionMillis;
        let newPos = pos - 30000
        this.state.audioFile.setPositionAsync(newPos)
    }

    handleStopPress() {
        this.state.audioFile.stopAsync()
        this.setState({
            playing: false
        })
    }

    async forward10s() {
        let thing = await this.state.audioFile.getStatusAsync();
        let pos = thing.positionMillis;
        let newPos = pos + 10000
        this.state.audioFile.setPositionAsync(newPos)
    }

    async forward30s() {
        let thing = await this.state.audioFile.getStatusAsync();
        let pos = thing.positionMillis;
        let newPos = pos + 30000
        this.state.audioFile.setPositionAsync(newPos)
    }

    whichButton() {
        if (!this.state.playing) {
            return (
                <Icon
                    name='play'
                    type='foundation'
                    onPress={() => this.handlePlayPress()}
                    size={55}
                />
            )
        } else {
            return (
                <Icon
                    name='pause'
                    type='foundation'
                    onPress={() => this.handlePausePress()}
                    size={50}
                />
            )
        }
    }

    showButtons() {
        if (this.state.audioFile != null) {
            return (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                    <Icon
                        name='replay-10'
                        onPress={() => this.back10s()}
                        color='#999'
                        size={40}
                    />
                    <Icon
                        name='replay-30'
                        onPress={() => this.back30s()}
                        color='#999'
                        size={40}
                    />
                    {this.whichButton()}
                    <Icon
                        name='stop'
                        type='foundation'
                        onPress={() => this.handleStopPress()}
                        size={50}
                    />
                    <Icon
                        name='forward-10'
                        onPress={() => this.forward10s()}
                        color='#999'
                        size={40}
                    />
                    <Icon
                        name='forward-30'
                        onPress={() => this.forward30s()}
                        color='#999'
                        size={40}
                    />
                </View>
            )
        } else {
            return (
                <ActivityIndicator size='large' />
            )
        }
    }

    render() {
        let item = this.props.navigation.state.params
        return (
            <View style={styles.containerStyle}>
                <Header
                    leftText={'Back'}
                    leftPress={() => this.props.navigation.goBack()}
                    centerText={'Play Sermon'}
                />
                <View style={styles.contentContainer}>
                    <Slider
                        style={styles.sliderStyle}    
                        disabled={true}
                        value={this.state.position}
                        minimumValue={0}
                        maximumValue={this.state.length}
                    />
                    <Text style={{ alignSelf: 'center', marginBottom: 20 }}>{this._getTimestamp()}</Text>
                    {this.showButtons()}
                    <Button onPress={() => this.props.markAsListened(this.props.navigation.state.params.item[2])}>Mark Finished</Button>
                </View>
            </View>
        )
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    contentContainer: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderStyle: {
        width: '90%',
    }
}

export default connect(null, { markAsListened })(PlayerScreen);