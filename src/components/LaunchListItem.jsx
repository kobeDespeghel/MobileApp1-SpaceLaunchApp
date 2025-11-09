import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

function formatShortDateTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return isoString;

  try {
    return d.toLocaleString(undefined, {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch (e) {
    return isoString;
  }
}

export default function LaunchListItem({ launch, onPress }) {
  // simple row layout matching header columns
  const formattedStart = formatShortDateTime(launch.startwindow);
  const formattedEnd = formatShortDateTime(launch.endwindow);

  return (
    <TouchableOpacity title="go to detail" style={styles.row} onPress={onPress}>
      <Text style={[styles.cell, styles.name]} numberOfLines={1}>
        {launch.name}
      </Text>
      <Text style={[styles.cell, styles.status]}>{launch.status}</Text>
      <View style={[styles.cell, styles.window]}>
        <Text style={styles.cell} numberOfLines={1}>
          {formattedStart}
        </Text>
        <Text style={styles.cell} numberOfLines={1}>
          {formattedEnd}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  cell: {
    paddingHorizontal: 6,
    color: "#222",
  },
  name: {
    flex: 3,
  },
  status: {
    flex: 1,
    textAlign: "center",
  },
  window: {
    flex: 2,
    flexDirection: "column",
  },
});
