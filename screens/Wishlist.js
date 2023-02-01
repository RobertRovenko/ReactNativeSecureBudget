import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Task from "../components/Task";
//import { AsyncStorage } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Wishlist = () => {
  const navigation = useNavigation();
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  //function to add my tasks
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  //function to delete a task when the user doesnt want it anymore
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);

    setTaskItems(itemsCopy);
    AsyncStorage.setItem("taskItems", JSON.stringify(itemsCopy));
  };

  //useEffect with asyncStorage to save items in my wishlist when logging out and in
  useEffect(() => {
    (async () => {
      const todosFromStorage = await AsyncStorage.getItem("taskItems");
      if (todosFromStorage) {
        setTaskItems(JSON.parse(todosFromStorage));
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={{ marginTop: 100 }}>
        <View style={{}}>
          <Text style={[styles.text, { fontSize: 20 }]}>Wishlist!</Text>
        </View>
        <Text style={styles.text}>What items do you wish for?</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={[styles.typeBox, { marginRight: 0 }]}
            placeholder="E.g: Computer"
            value={task}
            onChangeText={(text) => {
              setTask(text);
            }}
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
              handleAddTask();
              AsyncStorage.setItem(
                "taskItems",
                JSON.stringify([...taskItems, task])
              );
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
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      ></View>
      <Text
        style={[
          styles.headerText,
          {
            color: "#727479",
            borderBottomColor: "#727479",
            borderBottomWidth: 0.2,
          },
        ]}
      >
        Item History
      </Text>
      <View style={styles.trackerContainer2}>
        <ScrollView>
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.balancehistoryContainer}
                key={index}
                onLongPress={() => {
                  completeTask(index);
                }}
              >
                <Task text={item}></Task>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    color: "red",
                    margin: 20,
                    position: "absolute",
                    right: 20,
                  }}
                  source={require("../images/cross1.png")}
                ></Image>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <Text style={styles.tipText}>
        TIP: Long press your items in your history to delete them!
      </Text>
      <View style={{ flexDirection: "row", margin: 20 }}>
        <TouchableOpacity
          style={[styles.middleButton, , { backgroundColor: "#1e1e1e" }]}
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
        <TouchableOpacity
          style={[styles.middleButton, { backgroundColor: "#1e1e1e" }]}
          onPress={() => {
            handleAddTask();
            AsyncStorage.setItem(
              "taskItems",
              JSON.stringify([...taskItems, task])
            );
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
      <StatusBar backgroundColor="#1e1e1e" style="light" translucent={true} />
    </KeyboardAvoidingView>
  );
};

export default Wishlist;

//STYLES

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
  },
  text: {
    fontFamily: "Grotesk",
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    margin: 25,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 11,
  },
  balancehistoryContainer: {
    textAlign: "center",
    flexDirection: "row",
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 0.2,
    margin: 10,
  },

  headerText: {
    fontFamily: "Grotesk",
    color: "#dbdbdb",
    fontSize: 15,
    margin: 20,
    alignSelf: "center",
  },

  middleButton: {
    backgroundColor: "#dbdbdb",
    width: "30%",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "white",
    color: "white",
    marginLeft: 20,
    margin: 7,
    marginVertical: 20,
    alignSelf: "center",
  },

  trackerContainer2: {
    flexDirection: "row",
    flex: 0.9,
    backgroundColor: "#2c2c2c",
    marginHorizontal: 20,
    textAlign: "center",
  },

  text: {
    fontFamily: "Grotesk",
    color: "#dbdbdb",
    fontSize: 15,
    alignSelf: "center",
    margin: 25,
  },
  crossButton: {
    fontFamily: "Grotesk",
    color: "#dbdbdb",
    fontSize: 15,
    color: "red",
    margin: 20,

    position: "absolute",
    right: 20,
  },
  tipText: {
    fontFamily: "Grotesk",
    color: "#727479",
    fontSize: 11,
    alignSelf: "center",
    marginTop: 5,
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
});
