import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";

export default function ProfileScreen() {
  const handleEmail = () =>
    Linking.openURL("mailto:kobe.despeghel@example.com");
  const handlePhone = () => Linking.openURL("tel:+32123456789");
  const handleWebsite = () => Linking.openURL("https://example.com");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: "https://placekitten.com/200/200" }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Kobe Despeghel</Text>
        <Text style={styles.role}>Developer</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>
            I'm a student at Vives Kortrijk studying programming. I play
            handball and I live in Roeselare, Belgium.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>

          <TouchableOpacity style={styles.contactRow} onPress={handleEmail}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>kobe.despeghel@example.com</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactRow} onPress={handlePhone}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>+32 123 45 678</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactRow} onPress={handleWebsite}>
            <Text style={styles.contactLabel}>Website</Text>
            <Text style={styles.contactValue}>example.com</Text>
          </TouchableOpacity>

          <View style={styles.contactRow}>
            <Text style={styles.contactLabel}>Location</Text>
            <Text style={styles.contactValue}>Roeselare, Belgium</Text>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f2f4f8",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  role: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 16,
  },
  section: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eef2f7",
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  contactLabel: {
    color: "#6b7280",
    fontWeight: "600",
  },
  contactValue: {
    color: "#111827",
  },
});
