import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Task = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.balanceText}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceText: {
    fontFamily: "Grotesk",
    color: "#dbdbdb",
    fontSize: 20,
    margin: 20,
  },
});

export default Task;
