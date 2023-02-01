import { useNavigation } from "@react-navigation/native";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const Stocks = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          marginTop: 25,
        }}
      >
        <View>
          <Text style={[styles.text, { fontSize: 30 }]}>Stocks</Text>
          <Text style={styles.text}>
            Here you can see the Fear and Greed Index!
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 300,
          width: 330,
          justifyContent: "space-between",
        }}
      >
        <Image
          style={{
            height: 303,
            width: 333,
            borderRadius: 20,
            borderColor: "black",
            borderTopWidth: 0.5,
            borderLeftWidth: 0.5,
            borderBottomWidth: 2,
            borderRightWidth: 2,
          }}
          source={{
            uri: "https://alternative.me/crypto/fear-and-greed-index.png",
          }}
        ></Image>
      </View>
      <Text style={[styles.text, { fontSize: 13, margin: 10 }]}>
        The Index is live and updates every day!
      </Text>

      <Text
        style={{
          color: "white",
          marginTop: 20,

          textAlign: "center",
          margin: 20,
        }}
      >
        <Text style={{ color: "lightgreen" }}>Extreme fear</Text> can be a sign
        that investors are too worried. That could be a buying opportunity.
      </Text>

      <Text
        style={{
          color: "white",
          marginTop: 20,

          textAlign: "center",
          marginTop: 20,
          margin: 20,
        }}
      >
        When Investors are getting
        <Text style={{ color: "red" }}> too greedy</Text> that means the market
        is due for a correction.
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#1e1e1e" }]}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            source={require("../images/left.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="#1e1e1e" style="light" translucent={true} />
    </KeyboardAvoidingView>
  );
};

export default Stocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
  },
  button: {
    backgroundColor: "black",
    width: 100,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
    alignSelf: "center",
  },
  text: {
    fontFamily: "Grotesk",
    color: "white",
    fontSize: 15,
    textAlign: "center",
    margin: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 11,
  },
});
