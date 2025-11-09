import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useState, useEffect, use } from "react";

export default function DropDown({ filterList, selectFilter }) {
  const [filter, setFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    selectFilter(filter);
  }, [filter]);

  return (
    <View style={styles.filterRow}>
      <TouchableOpacity
        style={[
          styles.filterButton,
          filter !== "All" && styles.filterButtonActive,
        ]}
        onPress={() => setShowDropdown((s) => !s)}
      >
        <Text style={styles.sortText}>{`Status: ${filter}`}</Text>
      </TouchableOpacity>
      {showDropdown && (
        <View style={styles.dropdown}>
          {filterList.map((s) => (
            <TouchableOpacity
              key={s}
              style={styles.dropdownItem}
              onPress={() => {
                setFilter(s);
                setShowDropdown(false);
              }}
            >
              <Text style={styles.sortText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
