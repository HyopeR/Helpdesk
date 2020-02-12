import React from 'react';
import { Text, TextInput, StyleSheet, View, TouchableHighlight } from 'react-native';

const Input = ({ text, inputPlaceHolder, onChangeText, value, secureTextEntry }) => {
  const { inputWrapper, textStyle, inputStyle, inputArea } = styles;

  return (
    <View style={inputWrapper}>
      <Text style={textStyle}> {text} </Text>
      <TouchableHighlight style={inputArea}>
      <TextInput
        style={inputStyle}
        secureTextEntry={secureTextEntry}
        placeholder={inputPlaceHolder}
        onChangeText={onChangeText}
        placeholderTextColor='rgba(0, 0, 0, 0.5)'
        value={value}
      />
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    height: 50,
    width: 'auto',
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: '#000',
    width: '30%',
  },
  inputStyle: {
    fontSize: 18,
    color: '#000',
  },
  inputArea: {
    width: '70%',
  }
});

export { Input };
