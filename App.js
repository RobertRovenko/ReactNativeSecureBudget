import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import Stocks from "./screens/Stocks";
import { useFonts } from "expo-font";

import Wishlist from "./screens/Wishlist";

const Stack = createNativeStackNavigator();

//my own fonts ive downloaded to use in this project
export default function App() {
  const [loaded] = useFonts({
    BebasNeue: require("./assets/fonts/BebasNeue-Regular.ttf"),
    SecularOne: require("./assets/fonts/SecularOne-Regular.ttf"),
    Grotesk: require("./assets/fonts/HankenGrotesk-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  //My stack screens for navigation
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Stocks"
          component={Stocks}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Wishlist"
          component={Wishlist}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
