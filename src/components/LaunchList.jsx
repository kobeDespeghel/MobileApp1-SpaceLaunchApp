import { View, FlatList, StyleSheet, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

import LaunchListItem from "./LaunchListItem";
import LaunchListHeader from "./LaunchListHeader";

export default function LaunchList({
  onLaunchPress,
  launches,
  sortBy,
  sortDirection,
}) {
  const items = Array.isArray(launches) ? launches : [];

  if (sortBy) {
    const dir = sortDirection === "asc" ? 1 : -1;

    if (sortBy === "name") {
      items.sort((a, b) => {
        const aName = a.name.toString();
        const bName = b.name.toString();
        return aName.localeCompare(bName) * dir;
      });
    }

    if (sortBy === "start") {
      items.sort((a, b) => {
        const aTime = Date.parse(a.startwindow) ?? 0;
        const bTime = Date.parse(b.startwindow) ?? 0;

        const na = aTime;
        const nb = bTime;
        return (na - nb) * dir;
      });
    }
  }

  const data = [{ isHeader: true, id: "header" }, ...items];

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={({ item }) =>
          item && item.isHeader ? (
            <LaunchListHeader />
          ) : (
            <LaunchListItem
              launch={item}
              onPress={() => onLaunchPress(item.id)}
            />
          )
        }
        keyExtractor={(item) => (item && item.isHeader ? item.id : item.id)}
        // header is the first data element; make it sticky
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
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
