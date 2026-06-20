import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import MenuRow from "../components/MenuRow";
import { colors } from "../components/theme";

export default function ProductsScreen() {
  const products = [
    ["iKeš loan", "hand-coin-outline"],
    ["Current account", "bank-outline"],
    ["Credit cards", "credit-card-outline"],
    ["Loans", "file-document-outline"],
    ["Account set", "package-variant-closed"],
    ["Digital services", "hubspot"],
    ["Savings", "sack-percent"],
    ["Investments", "cash-sync"],
    ["Insurance", "shield-heart-outline"],
    ["Leasing", "car-outline"],
  ] as const;

  return (
    <View style={styles.container}>
      <Header title="Apply for Bank products" />
      <ScrollView contentContainerStyle={styles.content}>
        {products.map(([title, icon]) => (
          <MenuRow key={title} title={title} icon={icon as any} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 130 },
});