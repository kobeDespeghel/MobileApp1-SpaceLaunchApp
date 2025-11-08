import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import LaunchList from "../components/LaunchList";

export default function HomeScreen({ navigation }) {
  const handleLaunchPress = (launchId) => {
    navigation.navigate("Detail", { launchId });
  };

  return (
    <View style={styles.container}>
      <LaunchList onLaunchPress={(id) => handleLaunchPress(id)} />
      <StatusBar barStyle="default" />
    </View>
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
