import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function DetailScreen({ launchId }) {
  // Sample launch object for now — replace with real data / route params later
  const launch = {
    id: launchId,
    name: "Falcon 9 • Starlink 7",
    status: "Go",
    windowStart: "2025-11-08T14:30:00Z",
    windowEnd: "2025-11-08T14:45:00Z",
    imageUrl: "https://www.spacex.com/static/images/share.jpg",
    provider: { name: "SpaceX", country: "USA" },
    mission:
      "Deploying a batch of Starlink satellites to low Earth orbit during a 15-minute launch window. Primary payload separation is expected ~15 minutes after liftoff. This mission will also perform a first-stage return to Landing Zone 1.",
  };

  const formatDateTime = (iso) => {
    try {
      return new Date(iso).toLocaleString();
    } catch (e) {
      return iso;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: launch.imageUrl }} style={styles.image} />

      <View style={styles.header}>
        <Text style={styles.title}>{launch.name}</Text>
        <View
          style={[
            styles.statusPill,
            launch.status === "Go" ? styles.statusGo : styles.statusNoGo,
          ]}
        >
          <Text style={styles.statusText}>{launch.status}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Window start</Text>
        <Text style={styles.value}>{formatDateTime(launch.windowStart)}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Window end</Text>
        <Text style={styles.value}>{formatDateTime(launch.windowEnd)}</Text>
      </View>

      <View style={styles.provider}>
        <Text style={styles.label}>Provider</Text>
        <Text style={styles.value}>
          {launch.provider.name} • {launch.provider.country}
        </Text>
      </View>

      <View style={styles.mission}>
        <Text style={styles.label}>Mission</Text>
        <Text style={styles.description}>{launch.mission}</Text>
      </View>

      <Text style={styles.footer}>Launch ID: {launch.id}</Text>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    flex: 1,
    marginRight: 12,
  },
  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusGo: {
    backgroundColor: "#0a9e3b",
  },
  statusNoGo: {
    backgroundColor: "#d64545",
  },
  statusText: {
    color: "#fff",
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    color: "#666",
    fontSize: 14,
  },
  value: {
    color: "#111",
    fontSize: 14,
    flexShrink: 1,
    textAlign: "right",
  },
  provider: {
    marginTop: 12,
    paddingVertical: 8,
  },
  mission: {
    marginTop: 12,
  },
  description: {
    marginTop: 6,
    color: "#333",
    fontSize: 15,
    lineHeight: 20,
  },
  footer: {
    marginTop: 18,
    color: "#888",
    textAlign: "center",
  },
});
