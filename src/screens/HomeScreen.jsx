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
import { GetUpcommingLaunches, GetStatuses } from "../helpers/apiCalls";
import DropDown from "../components/DropDown";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [launches, setLaunches] = useState([]);
  const [sortBy, setSortBy] = useState(null); // 'name' | 'start' | null
  const [sortDirection, setSortDirection] = useState("asc"); // 'asc' | 'desc'
  const [filterStatus, setFilterStatus] = useState("All");
  const [statuses, setStatuses] = useState(["All"]);

  //runs once
  useEffect(() => {
    fetchStatuses();
    fetchLaunches();
  }, []);

  useEffect(() => {
    let selectedStatus = statuses.find((s) => s.abbrev === filterStatus);
    console.log("Selected filter status:", selectedStatus);
    fetchLaunches(selectedStatus?.id || null);
  }, [filterStatus]);

  const handleLaunchPress = (launchId) => {
    navigation.navigate("Detail", { launchId });
  };

  const fetchStatuses = async () => {
    const result = await GetStatuses();
    if (result && !result.error) {
      setStatuses([{ id: 0, abbrev: "All" }, ...result]);
    } else {
      console.error("Failed to fetch statuses:", result.error);
    }
  };

  const fetchLaunches = async (filterStatusId = null) => {
    const result = await GetUpcommingLaunches(searchQuery, filterStatusId);
    if (result && !result.error) {
      setLaunches(result);
    } else {
      console.error("Failed to fetch launches:", result.error);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortDirection("asc");
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
            Name{" "}
            {sortBy === "name" ? (sortDirection === "asc" ? "↓" : "↑") : ""}
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
            Start{" "}
            {sortBy === "start" ? (sortDirection === "asc" ? "↓" : "↑") : ""}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Status filter dropdown */}
      <DropDown
        filterList={statuses.map((s) => s.abbrev)}
        selectFilter={setFilterStatus}
      />

      {launches.length === 0 ? (
        <Text>No launches found.</Text>
      ) : (
        <LaunchList
          launches={launches}
          onLaunchPress={(id) => handleLaunchPress(id)}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />
      )}
      <StatusBar barStyle="default" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
  filterRow: {
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 8,
    alignItems: "flex-start",
    position: "relative",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  dropdown: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    borderRadius: 6,
    width: 200,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  filterButtonActive: {
    borderColor: "#0a9e3b",
    backgroundColor: "#eaf7ec",
  },
});
