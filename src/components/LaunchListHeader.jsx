import { Text, View, StyleSheet } from "react-native";

export default function LaunchListHeader() {
  return (
    <View style={styles.header}>
      <Text style={[styles.headerText, styles.name]}>Name</Text>
      <Text style={[styles.headerText, styles.status]}>Status</Text>
      <Text style={[styles.headerText, styles.start]}>Start Window</Text>
      {/* <Text style={[styles.headerText, styles.end]}>End Window</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "700",
    color: "#333",
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
