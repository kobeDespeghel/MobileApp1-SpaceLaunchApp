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
import DropDown from "../components/DropDown";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [launches, setLaunches] = useState([]);
  const [sortBy, setSortBy] = useState(null); // 'name' | 'start' | null
  const [sortDir, setSortDir] = useState("asc"); // 'asc' | 'desc'
  const [filterStatus, setFilterStatus] = useState("All");
  const [statuses, setStatuses] = useState(["All"]);
  // const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // helper to normalize/extract a status string from a launch object
  const getLaunchStatus = (l) => {
    if (!l) return "unknown";
    if (typeof l.status === "string") return l.status;
    if (l.status && typeof l.status === "object") {
      return l.status.name || l.status.abbrev || l.status?.status || "unknown";
    }
    return l.statusName || l.status_name || l.status_text || "unknown";
  };

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
      // derive unique statuses from the returned launches
      const unique = Array.from(
        new Set(result.map((r) => getLaunchStatus(r) || "unknown"))
      );
      setStatuses(["All", ...unique.filter((s) => s != null && s !== "")]);
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

      {/* Status filter dropdown */}
      <DropDown filterList={statuses} selectFilter={setFilterStatus} />
      {/* <View style={styles.filterRow}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus !== "All" && styles.filterButtonActive,
          ]}
          onPress={() => setShowStatusDropdown((s) => !s)}
        >
          <Text style={styles.sortText}>{`Status: ${filterStatus}`}</Text>
        </TouchableOpacity>
        {showStatusDropdown && (
          <View style={styles.dropdown}>
            {statuses.map((s) => (
              <TouchableOpacity
                key={s}
                style={styles.dropdownItem}
                onPress={() => {
                  setFilterStatus(s);
                  setShowStatusDropdown(false);
                }}
              >
                <Text style={styles.sortText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View> */}

      {/* filter launches client-side by selected status */}
      {/** compute filtered launches */}
      <LaunchList
        launches={launches.filter((l) => {
          if (!filterStatus || filterStatus === "All") return true;
          const s = getLaunchStatus(l);
          return s === filterStatus;
        })}
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
