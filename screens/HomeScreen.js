import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableHighlight,
  Pressable,
  Modal,
  FlatList,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { auth } from "../firebase";
import Stocks from "./Stocks";
import Wishlist from "./Wishlist";
import Hello from "../components/Hello";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [modal, setmodal] = useState(false);
  const [modalIncome, setmodalIncome] = useState(false);
  const [modalSettings, setmodalSettings] = useState(false);

  const [dollar, setDollar] = useState("black");
  const [euro, setEuro] = useState("grey");
  const [sek, setSek] = useState("grey");

  const [value, setValue] = useState(0);
  const [currency, setCurrency] = useState(" $");
  const [inputValue, setInputValue] = useState("");
  const [prevInputValues, setPrevInputValues] = useState([]);
  const [prevInputValues2, setPrevInputValues2] = useState([]);

  //CUSTOM GIF ANIMATION ON BUTTONPRESS

  const [played, setPlayed] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleGifPress = () => {
    setPlayed(true);
  };

  useEffect(() => {
    if (played) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        setPlayed(false);

        fadeAnim.setValue(1);
      });
    }
  }, [played]);

  //Async to save ur total value, and your history so you dont lose it when you log in or out!

  const saveValue = async () => {
    try {
      await AsyncStorage.setItem("value", value.toString());
      await AsyncStorage.setItem(
        "prevInputValues",
        JSON.stringify(prevInputValues)
      );
      await AsyncStorage.setItem(
        "prevInputValues2",
        JSON.stringify(prevInputValues2)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const loadValue = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("value");
      if (storedValue) {
        setValue(parseInt(storedValue));
      }
      const storedPrevInputValues = await AsyncStorage.getItem(
        "prevInputValues"
      );
      if (storedPrevInputValues) {
        setPrevInputValues(JSON.parse(storedPrevInputValues));
      }
      const storedPrevInputValues2 = await AsyncStorage.getItem(
        "prevInputValues2"
      );
      if (storedPrevInputValues2) {
        setPrevInputValues2(JSON.parse(storedPrevInputValues2));
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Useeffects for my async so its automated

  useEffect(() => {
    loadValue();
  }, []);

  useEffect(() => {
    saveValue();
  }, [value, prevInputValues, prevInputValues2]);

  //function to logout from the app
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  //Alert when pressing the logout button
  const createAlert = () => {
    Alert.alert("Logout", "Are you sure?", [
      {
        cancelable: true,
        text: "Back",
      },
      {
        text: "Logout",
        onPress: () => {
          handleSignOut();
          setmodalSettings(false);
        },
      },
    ]);
  };

  const createAlertTrash = () => {
    Alert.alert("About to delete your balance", "Are you sure?", [
      {
        cancelable: true,
        text: "Back",
      },
      {
        text: "Delete",
        onPress: () => {
          setValue(0);
          setPrevInputValues([]);
          setPrevInputValues2([]);
        },
      },
    ]);
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <View>
          {played ? (
            <Image source={require("../images/stockgif2.gif")} />
          ) : (
            <Animated.View style={{ flexDirection: "row", opacity: fadeAnim }}>
              <Image
                style={styles.headerImage}
                source={require("../images/incognito2.jpg")}
              />
              <View style={{ flexDirection: "column", margin: 0 }}>
                <Text style={styles.headerText}>Welcome back,</Text>
                <Text style={styles.headerText}>{auth.currentUser?.email}</Text>
              </View>
            </Animated.View>
          )}
        </View>
      </View>
      <View style={styles.middleContainer}>
        <Text style={{ color: "#727479", marginTop: 15 }}>
          Current Total Balance
        </Text>
        <Text
          style={styles.middleHeader}
          onPress={() => {
            setValue(0);
            setPrevInputValues([]);
            setPrevInputValues2([]);
          }}
        >
          {value}
          {currency}
        </Text>
        <Text style={styles.tipText}>
          TIP: Tap your balance to reset the calculator!
        </Text>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableHighlight
            onPress={() => {
              setmodalIncome(true);
            }}
            underlayColor=""
            style={styles.middleButton}
          >
            <View>
              <View>
                <Text style={styles.buttonText}>Add Income</Text>
              </View>

              <Modal
                visible={modalIncome}
                transparent={false}
                style={styles.modalBackground}
                statusBarTranslucent
                animationType="fade"
              >
                <View
                  style={[
                    styles.typeview,
                    { backfaceVisibility: "hidden", paddingTop: 200 },
                  ]}
                >
                  <KeyboardAvoidingView>
                    <Text style={styles.text}>Type in your income</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <TextInput
                        style={styles.typeBox}
                        value={inputValue}
                        onChangeText={(newValue) => {
                          setInputValue(newValue);
                        }}
                        placeholder="E.g: 100"
                        keyboardType="numeric"
                      ></TextInput>
                      <TouchableOpacity
                        style={[
                          styles.middleButton,
                          {
                            margin: 0,
                            padding: 0,
                            width: "10%",
                            borderRadius: 20,
                            marginRight: 20,
                          },
                        ]}
                        onPress={() => {
                          setmodalIncome(false);
                          setPrevInputValues2([
                            ...prevInputValues2,
                            inputValue,
                          ]);

                          setValue(value + Number(inputValue));
                          setInputValue("");
                          handleGifPress();
                        }}
                      >
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                          }}
                          source={require("../images/blackplus.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.tipText, { marginTop: 30 }]}>
                      TIP: If this is your first time, just type in your whole
                      balance to add it.
                    </Text>
                    <View style={{ flex: 0.65 }}></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        flex: 0.3,
                      }}
                    >
                      <Pressable
                        style={[
                          styles.pressableButton,
                          {
                            backgroundColor: "#1e1e1e",
                            flex: 0.3,
                          },
                        ]}
                        title="DONE"
                        onPress={() => setmodalIncome(false)}
                      >
                        <Image
                          style={{
                            height: 30,
                            width: 30,
                          }}
                          source={require("../images/left.png")}
                        ></Image>
                      </Pressable>
                      <TouchableOpacity
                        style={[
                          styles.pressableButton,
                          { backgroundColor: "#1e1e1e" },
                        ]}
                        onPress={() => {
                          setmodalIncome(false);
                          setPrevInputValues2([
                            ...prevInputValues2,
                            inputValue,
                          ]);
                          setValue(value + Number(inputValue));
                          setInputValue("");
                          handleGifPress();
                        }}
                      >
                        <Image
                          style={{
                            height: 30,
                            width: 30,
                          }}
                          source={require("../images/plus.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                </View>
              </Modal>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setmodal(true);
            }}
            underlayColor=""
            style={styles.middleButton}
          >
            <View>
              <View>
                <Text style={styles.buttonText}>Add Expense</Text>
              </View>

              <Modal
                visible={modal}
                transparent={false}
                style={styles.modalBackground}
                animationType="fade"
              >
                <View
                  style={[
                    styles.typeview,
                    { backfaceVisibility: "hidden", paddingTop: 200 },
                  ]}
                >
                  <KeyboardAvoidingView>
                    <Text style={styles.text}>Total cost of Expense</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextInput
                        style={styles.typeBox}
                        value={inputValue}
                        onChangeText={(newValue) => {
                          setInputValue(newValue);
                        }}
                        placeholder="E.g: 50"
                        keyboardType="numeric"
                      ></TextInput>
                      <TouchableOpacity
                        style={[
                          styles.middleButton,
                          {
                            margin: 0,
                            padding: 0,
                            width: "10%",
                            borderRadius: 20,
                            marginRight: 20,
                          },
                        ]}
                        onPress={() => {
                          setPrevInputValues([...prevInputValues, inputValue]);
                          setValue(value - Number(inputValue));
                          setInputValue("");
                          handleGifPress();
                          setmodal(false);
                        }}
                      >
                        <Image
                          style={{
                            height: 20,
                            width: 20,
                          }}
                          source={require("../images/blackplus.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.9 }}></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <Pressable
                        style={[
                          styles.pressableButton,
                          { backgroundColor: "#1e1e1e", flex: 0.3 },
                        ]}
                        title="DONE"
                        onPress={() => setmodal(false)}
                      >
                        <Image
                          style={{
                            height: 30,
                            width: 30,
                          }}
                          source={require("../images/left.png")}
                        ></Image>
                      </Pressable>

                      <TouchableOpacity
                        style={[
                          styles.pressableButton,
                          { backgroundColor: "#1e1e1e" },
                        ]}
                        onPress={() => {
                          setPrevInputValues([...prevInputValues, inputValue]);
                          setValue(value - Number(inputValue));
                          setInputValue("");
                          handleGifPress();

                          setmodal(false);
                        }}
                      >
                        <Image
                          style={{
                            height: 30,
                            width: 30,
                          }}
                          source={require("../images/plus.png")}
                        ></Image>
                      </TouchableOpacity>
                    </View>
                  </KeyboardAvoidingView>
                </View>
              </Modal>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      <Text
        style={[
          styles.headerText,
          {
            color: "#727479",
            borderBottomColor: "#727479",
            borderBottomWidth: 0.2,
            marginTop: 75,
            marginBottom: 30,
          },
        ]}
      >
        Balance History
      </Text>
      <View
        style={[
          styles.trackerContainer2,
          { flexDirection: "row", justifyContent: "space-evenly" },
        ]}
      >
        <FlatList
          data={prevInputValues2}
          renderItem={({ item }) => (
            <View
              style={[styles.balancehistoryContainer, { flexDirection: "row" }]}
            >
              <Text style={styles.balanceText}>Income </Text>
              <Text style={styles.incomeText}>
                +{item} {currency}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <FlatList
          data={prevInputValues}
          renderItem={({ item }) => (
            <View
              style={[styles.balancehistoryContainer, { flexDirection: "row" }]}
            >
              <Text style={styles.balanceText}>Expense </Text>
              <Text style={styles.expenseText}>
                -{item} {currency}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Text
          style={[
            styles.tipText,
            {
              textAlign: "center",
              justifyContent: "space-around",
              flexDirection: "column",
            },
          ]}
        ></Text>
      </View>

      {prevInputValues2.length > 0 ? (
        <Text style={styles.tipText}>
          Your budget is {value} {currency}
        </Text>
      ) : (
        <Text style={styles.tipText}>
          Add income and expenses to calculate your budget
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          margin: 20,
          justifyContent: "space-around",
          marginTop: 25,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          style={[styles.navButtons, { backgroundColor: "#1e1e1e" }]}
          onPress={() => navigation.navigate(Stocks)}
        >
          <Image
            style={{
              height: 22,
              width: 22,
            }}
            source={require("../images/stats.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButtons, { backgroundColor: "#1e1e1e" }]}
          onPress={() => navigation.navigate(Wishlist)}
        >
          <Image
            style={{
              height: 22,
              width: 22,
            }}
            source={require("../images/list.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButtons, { backgroundColor: "#1e1e1e" }]}
          onPress={() => {
            createAlertTrash();
          }}
        >
          <Image
            style={{
              height: 22,
              width: 22,
            }}
            source={require("../images/trash.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setmodalSettings(true);
          }}
          style={[styles.navButtons, { backgroundColor: "#1e1e1e" }]}
        >
          <Image
            style={{
              height: 20,
              width: 20,
            }}
            source={require("../images/settings.png")}
          ></Image>

          <Modal
            visible={modalSettings}
            transparent={false}
            style={styles.modalBackground}
            statusBarTranslucent
            animationType="slide"
          >
            <View
              style={[
                styles.typeview,
                {
                  backgroundColor: "#1e1e1e",
                  backfaceVisibility: "hidden",
                  paddingTop: 50,
                },
              ]}
            >
              <KeyboardAvoidingView>
                <View style={{ flex: 0.5 }}>
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 20, marginTop: 110, color: "white" },
                    ]}
                  >
                    Welcome to your settings!
                  </Text>
                </View>

                <View style={{ flex: 0.3 }}>
                  <Text style={[styles.text, { color: "white" }]}>
                    Set your currency!
                  </Text>
                  <View
                    style={{
                      justifyContent: "space-evenly",
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setmodalSettings(false);
                        setCurrency(" kr");
                        setSek("black");
                        setDollar("grey");
                        setEuro("grey");
                      }}
                      style={[
                        styles.middleButton,
                        {
                          borderBottomWidth: 1,
                          borderRightWidth: 1,
                          backgroundColor: sek,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            fontFamily: "SecularOne",
                            fontWeight: "",
                            fontSize: 13,
                            color: "white",
                          },
                        ]}
                      >
                        SEK
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setmodalSettings(false);
                        setCurrency(" $");
                        setSek("grey");
                        setDollar("black");
                        setEuro("grey");
                      }}
                      style={[
                        styles.middleButton,
                        {
                          borderBottomWidth: 1,
                          borderRightWidth: 1,
                          borderRightColor: "black",
                          borderBottomColor: "black",
                          backgroundColor: dollar,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            fontFamily: "SecularOne",
                            fontWeight: "600",
                            color: "white",
                            fontSize: 13,
                          },
                        ]}
                      >
                        DOLLAR
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setmodalSettings(false);
                        setCurrency(" €");
                        setSek("grey");
                        setDollar("grey");
                        setEuro("black");
                      }}
                      style={[
                        styles.middleButton,
                        {
                          borderBottomWidth: 1,
                          borderRightWidth: 1,
                          backgroundColor: euro,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.buttonText,
                          {
                            fontFamily: "SecularOne",
                            fontWeight: "",
                            color: "white",
                            fontSize: 13,
                          },
                        ]}
                      >
                        EURO
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Hello></Hello>
                <View
                  style={{
                    flexDirection: "row",
                    flex: 0.2,
                    justifyContent: "space-around",
                  }}
                >
                  <Pressable
                    style={[styles.navButtons, { backgroundColor: "#1e1e1e" }]}
                    title="DONE"
                    onPress={() => setmodalSettings(false)}
                  >
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                      }}
                      source={require("../images/left.png")}
                    ></Image>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.middleButton,
                      { backgroundColor: "#1e1e1e" },
                    ]}
                    title="DONE"
                  ></Pressable>
                  <TouchableOpacity
                    onPress={createAlert}
                    style={[styles.navButtons, { backgroundColor: "#1e1e1e" }]}
                  >
                    <Image
                      style={{
                        height: 20,
                        width: 20,
                        margin: 2,
                      }}
                      source={require("../images/exit.png")}
                    ></Image>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </TouchableOpacity>
      </View>

      <StatusBar backgroundColor="#1e1e1e" style="light" translucent={true} />
    </View>
  );
};

//STYLES

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 15,
  },
  headerContainer: {
    flexDirection: "row",
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  headerText: {
    fontFamily: "Grotesk",
    color: "#dbdbdb",
    fontSize: 15,
    marginLeft: 10,
    alignSelf: "center",
  },
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    borderColor: "#dbdbdb",
    borderWidth: 0.3,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    tintColor: "#dbdbdb",
  },
  middleContainer: {
    flex: 0.3,
    alignItems: "center",
  },
  middleHeader: {
    fontSize: 45,
    marginTop: 20,
    fontFamily: "Grotesk",
    alignSelf: "center",
    color: "#dbdbdb",
  },
  middleButton: {
    backgroundColor: "#dbdbdb",
    width: 80,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
    marginVertical: 10,
    alignSelf: "center",
  },
  navButtons: {
    backgroundColor: "#dbdbdb",

    alignItems: "center",
    margin: 20,
    marginVertical: 10,
    alignSelf: "center",
  },
  trackerContainer: {
    marginTop: 0,
    flex: 0.1,
    marginBottom: 0,
    backgroundColor: "#2c2c2c",
    backgroundColor: "yellow",
    marginHorizontal: 20,
  },
  trackerContainer2: {
    flexDirection: "row",
    flex: 0.6,
    backgroundColor: "#2c2c2c",
    marginHorizontal: 20,
  },
  balancehistoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.2,
    justifyContent: "space-evenly",
    marginRight: 10,
    marginLeft: 10,
  },
  expenseText: {
    color: "#e3342f",
    fontSize: 15,
    marginRight: 20,
    fontFamily: "Grotesk",
    margin: 20,
  },
  balanceText: {
    color: "#dbdbdb",
    fontFamily: "Grotesk",
    fontSize: 15,
    marginLeft: 20,
    margin: 20,
  },
  incomeText: {
    color: "#008b46",
    fontSize: 15,
    marginRight: 20,
    fontFamily: "Grotesk",
    margin: 20,
  },
  typeview: {
    alignSelf: "center",
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  pressableButton: {
    backgroundColor: "#dbdbdb",
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 100,
    alignSelf: "flex-end",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
  },
  text: {
    fontFamily: "Grotesk",
    color: "#dbdbdb",
    fontSize: 15,
    alignSelf: "center",
    margin: 25,
  },
  tipText: {
    fontFamily: "Grotesk",
    color: "#727479",
    fontSize: 11,
    alignSelf: "center",
    marginTop: 7,
    textAlign: "center",
    justifyContent: "space-between",
  },
  typeBox: {
    padding: 20,
    alignSelf: "center",
    backgroundColor: "#dbdbdb",
    borderRadius: 30,
    width: 300,
    height: 55,
    margin: 25,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 11,
  },
  pressableButtonSettings: {
    backgroundColor: "#dbdbdb",
    width: "20%",
    height: "30%",
    borderRadius: 10,
    alignItems: "center",
  },
});
