import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const Hello: React.FC<Props> = ({ name, baseEnthusiasmLevel = 3 }) => {
  const [enthusiasmLevel, setEnthusiasmLevel] =
    React.useState(baseEnthusiasmLevel);

  const onIncrement = () => setEnthusiasmLevel(enthusiasmLevel + 1);
  const onDecrement = () =>
    setEnthusiasmLevel(enthusiasmLevel > 0 ? enthusiasmLevel - 1 : 0);

  const getExclamationMarks = (numChars: number) =>
    numChars > 0 ? Array(numChars + 1).join("⭐") : "";

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Do you like the app?</Text>
      <Text style={styles.greeting}>
        {getExclamationMarks(enthusiasmLevel)}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignContent: "space-between",
          margin: 10,
        }}
      >
        <Button
          title="-"
          accessibilityLabel="decrement"
          onPress={onDecrement}
          color="#1e1e1e"
        />
        <View style={{ margin: 20 }}></View>
        <Button
          title="+"
          accessibilityLabel="increment"
          onPress={onIncrement}
          color="#1e1e1e"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    fontSize: 20,
    margin: 16,
    color: "white",
  },
});

export default Hello;
