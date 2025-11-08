import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LaunchList from "../components/LaunchList";
import { useEffect, useState } from "react";
import { GetUpcommingLaunches } from "../helpers/apiCalls";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [launches, setLaunches] = useState([]);
  const [sortBy, setSortBy] = useState(null); // 'name' | 'start' | null
  const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'

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

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDir("asc");
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
      <View style={styles.sortRow}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "name" && styles.sortButtonActive,
          ]}
          onPress={() => toggleSort("name")}
        >
          <Text style={styles.sortText}>
            Name {sortBy === "name" ? (sortDir === "asc" ? "↓" : "↑") : ""}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "start" && styles.sortButtonActive,
          ]}
          onPress={() => toggleSort("start")}
        >
          <Text style={styles.sortText}>
            Start {sortBy === "start" ? (sortDir === "asc" ? "↓" : "↑") : ""}
          </Text>
        </TouchableOpacity>
      </View>
      <LaunchList
        launches={launches}
        onLaunchPress={(id) => handleLaunchPress(id)}
        sortBy={sortBy}
        sortDir={sortDir}
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
  sortRow: {
    width: "100%",
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  sortButtonActive: {
    borderColor: "#0a9e3b",
    backgroundColor: "#eaf7ec",
  },
  sortText: {
    color: "#222",
    fontWeight: "600",
  },
});
