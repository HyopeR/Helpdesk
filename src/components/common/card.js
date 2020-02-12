import React from "react";
import { StyleSheet, View } from "react-native";

const Card = (props) => {
  return (
    <View style = {styles.cardWrapper}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    marginTop: 15,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#dddddd',
  }
});

export { Card };
