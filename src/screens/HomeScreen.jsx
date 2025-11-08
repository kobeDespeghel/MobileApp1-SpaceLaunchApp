import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TextInput } from "react-native";
import LaunchList from "../components/LaunchList";
import { useEffect, useState } from "react";
import { GetUpcommingLaunches } from "../helpers/apiCalls";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [launches, setLaunches] = useState([]);

  //runs once
  useEffect(() => {
    fetchLaunches();
  }, []);

  const handleLaunchPress = (launchId) => {
    navigation.navigate("Detail", { launchId });
  };

  const fetchLaunches = async () => {
    const result = await GetUpcommingLaunches(searchQuery);
    if (result && !result.error) {
      setLaunches(result);
    } else {
      console.error("Failed to fetch launches:", result.error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search launches..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={fetchLaunches}
          onBlur={fetchLaunches}
        />
      </View>
      <LaunchList
        launches={launches}
        onLaunchPress={(id) => handleLaunchPress(id)}
      />
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
  searchBar: {
    width: "100%",
    paddingHorizontal: 12,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: "transparent",
  },
  searchInput: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
});
