import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  TouchableHighlight,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../firebase";
import { Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setmodal] = useState(false);
  const { onPress, title = "BACK" } = props;

  const navigation = useNavigation();

  //useEffect thats used if the user is logged in and hasnt logged out (automatic login)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  //function that creates an account when signing up and consolelogs what mail is logged in
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  //function that logs you in after you input the correct credentials
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          setmodal(true);
        }}
        underlayColor=""
      >
        <View>
          <Image
            style={styles.image}
            source={require("../images/incognito2.jpg")}
          />
          <Modal visible={modal} transparent={true}>
            <View style={[styles.typeview, { backfaceVisibility: "hidden" }]}>
              <Article></Article>
              <Pressable
                style={styles.pressableButton}
                title="DONE"
                onPress={() => setmodal(false)}
              >
                <Text style={styles.buttonText}>{title}</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </TouchableHighlight>

      <Text style={styles.headerText}>Secure budget</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleLogin();
            Keyboard.dismiss();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleSignUp();
            Keyboard.dismiss();
          }}
          style={[styles.button, styles.buttonOutLine]}
        >
          <Text style={styles.buttonOutLineText}>Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor="" style="dark" translucent={true} />
    </KeyboardAvoidingView>
  );
};

//Secret button on the logo at the login screen as an easter egg

const Article = ({}) => {
  return (
    <View>
      <Text
        style={[
          styles.pressableButtonText,
          { fontSize: 40, fontFamily: "Grotesk" },
        ]}
      >
        Welcome to {"\n"}Secure Budget
      </Text>
      <Text style={styles.pressableButtonText}>
        The easiest way to calculate your budget, just input your income and
        expenses, to get and idea of what you can afford and start managing your
        money!
      </Text>
      <Text style={styles.pressableButtonText}>
        Just register or login for free and start planning your BUDGET!
      </Text>
      <Text style={styles.pressableButtonText}>
        Designed & made by {"\n"}Robert Falkbäck Rovenko
      </Text>

      <StatusBar backgroundColor="white" style="dark" translucent={true} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderWidth: 2,
    borderColor: "black",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 50,
    marginBottom: 55,
    fontFamily: "BebasNeue",
  },
  container: {
    fontFamily: "Grotesk",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonOutLine: {
    backgroundColor: "white",
    marginTop: -35,
    borderColor: "black",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonOutLineText: {
    color: "black",
    fontWeight: "700",
    fontSize: 15,
  },
  typeview: {
    alignSelf: "center",
    backgroundColor: "white",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  pressableButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    backgroundColor: "black",
    marginTop: "30%",
    marginBottom: 60,
  },
  pressableButtonText: {
    margin: 40,
    fontFamily: "Grotesk",
    fontSize: 15,
    textAlign: "center",
  },
});
