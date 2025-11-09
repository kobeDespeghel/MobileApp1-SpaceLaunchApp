import { View, FlatList, StyleSheet, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

import LaunchListItem from "./LaunchListItem";
import LaunchListHeader from "./LaunchListHeader";

export default function LaunchList({
  onLaunchPress,
  launches,
  sortBy,
  sortDir,
}) {
  const items = Array.isArray(launches) ? [...launches] : [];

  if (sortBy) {
    const dir = sortDir === "desc" ? -1 : 1;

    if (sortBy === "name") {
      items.sort((a, b) => {
        const an = (a.name || "").toString();
        const bn = (b.name || "").toString();
        return an.localeCompare(bn, undefined, { sensitivity: "base" }) * dir;
      });
    }

    if (sortBy === "start") {
      items.sort((a, b) => {
        const ta = a.startwindow ? Date.parse(a.startwindow) : 0;
        const tb = b.startwindow ? Date.parse(b.startwindow) : 0;
        // treat invalid dates as 0 so they appear first in asc; adjust if desired
        const na = Number.isNaN(ta) ? 0 : ta;
        const nb = Number.isNaN(tb) ? 0 : tb;
        return (na - nb) * dir;
      });
    }
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={items}
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
        // stickyHeaderIndices={[0]} // need to make header first component in list
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
