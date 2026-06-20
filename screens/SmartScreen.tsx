import { ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import { colors, radius } from "../components/theme";
import { Ionicons } from "@expo/vector-icons";

export default function SmartScreen() {
  return (
    <View style={styles.container}>
      <Header title="Smart" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <Ionicons name="sparkles" size={36} color={colors.yellow} />

          <Text style={styles.heroTitle}>
            AI Financial Assistant
          </Text>

          <Text style={styles.heroText}>
            Based on your spending habits, you could save
            €120 this month by reducing food delivery expenses.
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="pie-chart"
            size={28}
            color={colors.yellow}
          />

          <Text style={styles.cardTitle}>
            Spending Analysis
          </Text>

          <Text style={styles.cardText}>
            Most spending this month:
          </Text>

          <Text style={styles.highlight}>
            Food & Dining — €247
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="wallet"
            size={28}
            color={colors.yellow}
          />

          <Text style={styles.cardTitle}>
            Savings Goal
          </Text>

          <Text style={styles.cardText}>
            New Laptop Fund
          </Text>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.highlight}>
            €850 / €1500
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="shield-checkmark"
            size={28}
            color={colors.yellow}
          />

          <Text style={styles.cardTitle}>
            Fraud Detection
          </Text>

          <Text style={styles.cardText}>
            No suspicious transactions detected.
          </Text>
        </View>

        <View style={styles.card}>
          <Ionicons
            name="repeat"
            size={28}
            color={colors.yellow}
          />

          <Text style={styles.cardTitle}>
            Subscription Tracker
          </Text>

          <Text style={styles.cardText}>
            Active subscriptions:
          </Text>

          <Text style={styles.highlight}>
            Netflix • Spotify • iCloud+
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  content: {
    padding: 18,
    paddingBottom: 120,
    gap: 16,
  },

  heroCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 22,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  heroTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 10,
  },

  heroText: {
    color: colors.white,
    fontSize: 16,
    lineHeight: 24,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  cardTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },

  cardText: {
    color: "#CFCFCF",
    fontSize: 16,
  },

  highlight: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  progressTrack: {
    marginTop: 14,
    height: 12,
    borderRadius: 20,
    backgroundColor: "#303030",
    overflow: "hidden",
  },

  progressFill: {
    width: "57%",
    height: "100%",
    backgroundColor: colors.yellow,
  },
});