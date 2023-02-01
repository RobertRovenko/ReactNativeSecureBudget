import { Animated, Easing, StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useRef } from "react";

const Animation = () => {
  //initial value for opacity
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = new Animated.Value(0);
  const inNOut = new Animated.Value(0);

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeInAndOut = () => {
    Animated.sequence([
      Animated.timing(inNOut, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(inNOut, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: -100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -100,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 1,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const rotation = shakeAnim.interpolate({
    inputRange: [-20, 20],
    outputRange: ["30deg", "-30deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY: shakeAnim }, { rotateZ: rotation }],
      }}
    >
      <Button title="shake" onPress={shake}></Button>
      <Animated.Text
        style={{
          fontSize: 30,
          color: "white",
          opacity: fadeAnim,
          textAlign: "center",
        }}
      >
        Hidden text
      </Animated.Text>
      <Animated.Text
        style={{
          fontSize: 30,
          color: "white",
          opacity: inNOut,
          textAlign: "center",
        }}
      >
        👍
      </Animated.Text>

      <Button title="fadeIN" onPress={fadeIn}></Button>
      <Button title="fadeOut" onPress={fadeOut}></Button>
      <Button title="In and Out" onPress={fadeInAndOut}></Button>
    </Animated.View>
  );
};

export default Animation;
