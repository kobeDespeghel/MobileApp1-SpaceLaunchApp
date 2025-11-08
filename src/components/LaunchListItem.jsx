import { View, Text, StyleSheet } from "react-native";

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

export default function LaunchListItem({ launch }) {
  // simple row layout matching header columns
  const formattedStart = formatShortDateTime(launch.startwindow);

  return (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.name]} numberOfLines={1}>
        {launch.name}
      </Text>
      <Text style={[styles.cell, styles.status]}>{launch.status}</Text>
      <Text style={[styles.cell, styles.start]} numberOfLines={1}>
        {formattedStart}
      </Text>
      {/* <Text style={[styles.cell, styles.end]} numberOfLines={1}>
        {launch.endwindow}
      </Text> */}
    </View>
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
  start: {
    flex: 2,
  },
  end: {
    flex: 2,
  },
});
