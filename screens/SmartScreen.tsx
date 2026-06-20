
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Header from "../components/Header";
import { colors, radius } from "../components/theme";
import { RootStackParamList } from "../navigationTypes";

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type FeatureScreen =
  | "SavingPlan"
  | "TripBalance"
  | "BillSplit"
  | "MoneyWrapped"
  | "FinancialCoach";

type SmartFeature = {
  id: number;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: FeatureScreen;
};

const smartFeatures: SmartFeature[] = [
  {
    id: 1,
    title: "Saving Plans",
    subtitle:
      "Create a goal and move money from your current balance into savings.",
    icon: "wallet-outline",
    screen: "SavingPlan",
  },
  {
    id: 2,
    title: "Trip Spend Balance",
    subtitle:
      "Create a temporary shared trip card and manage money with friends.",
    icon: "airplane-outline",
    screen: "TripBalance",
  },
  {
    id: 3,
    title: "Smart AI Balance Split",
    subtitle:
      "Scan restaurant bills and split payments between multiple people.",
    icon: "receipt-outline",
    screen: "BillSplit",
  },
  {
    id: 4,
    title: "Monthly Money Wrapped",
    subtitle:
      "View your monthly spending and saving information as a slideshow.",
    icon: "stats-chart-outline",
    screen: "MoneyWrapped",
  },
  {
    id: 5,
    title: "AI Financial Coach",
    subtitle:
      "Get personalized advice based on your current balance and goals.",
    icon: "sparkles-outline",
    screen: "FinancialCoach",
  },
];

export default function SmartScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Header title="Smart Banking" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroIcon}>
            <Ionicons
              name="sparkles"
              size={30}
              color="#111111"
            />
          </View>

          <Text style={styles.heroTitle}>
            Your Smart Money Center
          </Text>

          <Text style={styles.heroText}>
            Save for important goals, manage trips with friends,
            split bills and receive personalized financial guidance.
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>
                €3,250
              </Text>

              <Text style={styles.heroStatLabel}>
                Available
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>
                €1,290
              </Text>

              <Text style={styles.heroStatLabel}>
                Saved
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.heroStat}>
              <Text style={styles.heroStatValue}>
                18
              </Text>

              <Text style={styles.heroStatLabel}>
                Day streak
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Smart Features
          </Text>

          <Text style={styles.sectionSubtitle}>
            Press a feature to open it
          </Text>
        </View>

        {smartFeatures.map((feature) => (
          <Pressable
            key={feature.id}
            style={({ pressed }) => [
              styles.featureCard,
              pressed && styles.featureCardPressed,
            ]}
            onPress={() =>
              navigation.navigate(feature.screen)
            }
          >
            <View style={styles.featureIcon}>
              <Ionicons
                name={feature.icon}
                size={27}
                color={colors.yellow}
              />
            </View>

            <View style={styles.featureInformation}>
              <Text style={styles.featureTitle}>
                {feature.title}
              </Text>

              <Text style={styles.featureSubtitle}>
                {feature.subtitle}
              </Text>
            </View>

            <View style={styles.arrowBox}>
              <Ionicons
                name="chevron-forward"
                size={21}
                color={colors.white}
              />
            </View>
          </Pressable>
        ))}
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
    paddingBottom: 130,
  },

  heroCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },

  heroIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },

  heroTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 16,
  },

  heroText: {
    color: "#C9C9C9",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 9,
  },

  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    paddingTop: 18,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  heroStat: {
    flex: 1,
    alignItems: "center",
  },

  heroStatValue: {
    color: colors.yellow,
    fontSize: 17,
    fontWeight: "900",
  },

  heroStatLabel: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border,
  },

  sectionHeader: {
    marginTop: 28,
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 13,
  },

  featureCardPressed: {
    opacity: 0.72,
    transform: [{ scale: 0.99 }],
  },

  featureIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292715",
  },

  featureInformation: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },

  featureTitle: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "800",
  },

  featureSubtitle: {
    color: "#AFAFAF",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
  },

  arrowBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292929",
  },
});
