import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const TextArea = ({ placeholder, onChangeText, value }) => {
  return (
    <View style = { styles.textAreaBack}>
      <View style = {styles.textAreaWrapper}>
        <TextInput placeholder = {placeholder}
          onChangeText = {onChangeText}
          multiline = {true}
          value = {value}
          style = {styles.textArea}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textAreaBack: {
    width: "100%",
    marginTop: 3,
    marginBottom: 3,
  },
  textAreaWrapper: {
    borderWidth: 1,
    height: 100,
    width: "100%",
    borderColor: "#000",
    borderRadius: 25,
  },
  textArea: {
    justifyContent: "flex-start",
    color: "#000",
    fontSize: 17,
    padding: 10,
  }
});

export  { TextArea };
