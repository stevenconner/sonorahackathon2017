// Import libraries for making a Component
import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';

// Make a component
const Header = (props) => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.leftViewStyle}>
        <TouchableOpacity onPress={props.leftPress}>
          <Text style={styles.leftTextStyle}>{props.leftText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.centerViewStyle}>
        <Text style={styles.centerTextStyle}>{props.centerText}</Text>
      </View>
      <View style={styles.rightViewStyle}>
        <TouchableOpacity onPress={props.rightPress}>
          <Text style={styles.rightTextStyle}>{props.rightText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    height: '10%',
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    paddingTop: (Platform.OS === 'android') ? 10 : 0,
    marginBottom: 10,
  },
  leftViewStyle: {
    flex: 0.20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftTextStyle: {
    color: '#4f4139',
    fontSize: 18,
    paddingTop: 18,
    paddingLeft: 15,
  },
  centerViewStyle: {
    flex: 0.60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTextStyle: {
    fontSize: 20,
    paddingTop: 15,
    fontWeight: 'bold'
  },
  rightViewStyle: {
    flex: 0.20,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightTextStyle: {
    color: '#4f4139',
    fontSize: 18,
    paddingTop: 18,
    paddingRight: 15,
  }
};

// Make the component available to other parts of the app
export { Header };
