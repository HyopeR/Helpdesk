import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import { Spinner } from './spinner';

const MyButtonSquare = ({ spinner, title, onPress, color }) => {
  const content = spinner ? (
    <Spinner />
  ) : (
    <TouchableHighlight
    style={styles.buttonElements}
    underlayColor={color}
    onPress={onPress}
    >
      <Text style={styles.buttonText}> {title} </Text>
    </TouchableHighlight>
  );

  return (
    <View style={styles.buttonWrapper}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    backgroundColor: '#be1221',
    marginTop: 10,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonElements: {
    backgroundColor: '#be1221',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
    alignItems: 'center',
  },
});

export { MyButtonSquare };
