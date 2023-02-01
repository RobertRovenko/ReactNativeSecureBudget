import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import { Text, View, TextInput, Button } from "react-native";

const InputRow = ({ label, buttonName, setName, user }) => {
  let newName = "";
  const handleButton = () => {
    setName(newName);
  };

  return (
    <View style={{ backgroundColor: "white" }}>
      <Text>{label}</Text>
      <TextInput
        style={{ borderColor: "yellow", borderRadius: 2, borderWidth: 3 }}
        onChangeText={(text) => (newName = text)}
      ></TextInput>
      <Button title={"buttonName"} onPress={handleButton}></Button>
    </View>
  );
};

export default InputRow;
