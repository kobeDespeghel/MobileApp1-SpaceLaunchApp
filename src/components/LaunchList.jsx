import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";

import LaunchListItem from "./LaunchListItem";
import LaunchListHeader from "./LaunchListHeader";

import { GetUpcommingLaunches } from "../helpers/apiCalls";

// const launches = [
//   {
//     id: "3f2e1a6c-9b4a-4b2f-8c5f-1a2b3c4d5e6f",
//     name: "Falcon 9 - Starlink Group 6",
//     status: "Scheduled",
//     startwindow: "2025-11-15T14:30:00Z",
//     endwindow: "2025-11-15T15:00:00Z",
//   },
//   {
//     id: "7a8b9c0d-1e2f-4a3b-9c8d-0e1f2a3b4c5d",
//     name: "Electron - Tomorrow X Demo",
//     status: "Scheduled",
//     startwindow: "2025-11-20T09:00:00Z",
//     endwindow: "2025-11-20T09:30:00Z",
//   },
//   {
//     id: "a1b2c3d4-e5f6-4a7b-8c9d-0a1b2c3d4e5f",
//     name: "Ariane 6 - Telecom Satellite",
//     status: "TBD",
//     startwindow: "2025-12-01T03:45:00Z",
//     endwindow: "2025-12-01T04:15:00Z",
//   },
//   {
//     id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
//     name: "Soyuz-2.1b - Crew Rotation",
//     status: "Hold",
//     startwindow: "2025-12-05T18:00:00Z",
//     endwindow: "2025-12-05T19:00:00Z",
//   },
//   {
//     id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
//     name: "Delta IV Heavy - Heavy Lift Test",
//     status: "Scheduled",
//     startwindow: "2025-12-12T22:10:00Z",
//     endwindow: "2025-12-12T22:40:00Z",
//   },
//   {
//     id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f80",
//     name: "Long March 5 - Lunar Cargo",
//     status: "Scheduled",
//     startwindow: "2026-01-08T05:00:00Z",
//     endwindow: "2026-01-08T05:45:00Z",
//   },
//   {
//     id: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8091",
//     name: "Rocket Lab - R3 Test Flight",
//     status: "Success",
//     startwindow: "2025-10-02T11:20:00Z",
//     endwindow: "2025-10-02T11:35:00Z",
//   },
//   {
//     id: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8091a2",
//     name: "Vulcan Centaur - GEO Launch",
//     status: "Scheduled",
//     startwindow: "2026-02-14T16:00:00Z",
//     endwindow: "2026-02-14T16:30:00Z",
//   },
//   {
//     id: "0a1b2c3d-4e5f-4a6b-7c8d-9e0f1a2b3c4d",
//     name: "H-IIA - Earth Observation",
//     status: "Failure",
//     startwindow: "2025-09-12T02:00:00Z",
//     endwindow: "2025-09-12T02:20:00Z",
//   },
//   {
//     id: "1b2c3d4e-5f6a-4b7c-8d9e-0f1a2b3c4d5e",
//     name: "New Glenn - Prototype Flight",
//     status: "Scheduled",
//     startwindow: "2026-03-03T12:30:00Z",
//     endwindow: "2026-03-03T13:15:00Z",
//   },
// ];

export default function LaunchList({ onLaunchPress, launches }) {
  // const [launches, setLaunches] = useState([]);

  // //runs once
  // useEffect(() => {
  //   const fetchLaunches = async () => {
  //     const result = await GetUpcommingLaunches();
  //     if (result && !result.error) {
  //       setLaunches(result);
  //     } else {
  //       console.error("Failed to fetch launches:", result.error);
  //     }
  //   };

  //   fetchLaunches();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.debugText}>Items: {launches.length}</Text>
      <FlatList
        data={launches}
        renderItem={({ item }) => (
          <LaunchListItem
            launch={item}
            onPress={() => onLaunchPress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={LaunchListHeader}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  separator: {
    height: 1,
    backgroundColor: "#e6e6e6",
  },
});
