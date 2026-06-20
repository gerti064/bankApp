import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YellowButton from "../components/YellowButton";
import { colors, radius } from "../components/theme";

type Props = {
  onBack: () => void;
};

export default function FiltersScreen({ onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={onBack}>
          <Ionicons name="chevron-back" size={40} color={colors.white} />
        </Pressable>

        <Text style={styles.title}>Filters</Text>

        <Pressable style={styles.clear}>
          <Text style={styles.clearText}>Clear filter</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card title="Search by">
          <View style={styles.segmentRow}>
            <Box text="Nearest" />
            <Box text="Radius" active />
            <Box text="Town" />
          </View>
          <View style={styles.radiusRow}>
            <Text style={styles.label}>Radius</Text>
            <View style={styles.input}>
              <Text style={styles.inputText}>15</Text>
            </View>
          </View>
          <View style={styles.slider}>
            <View style={styles.sliderActive} />
            <View style={styles.thumb} />
          </View>
          <View style={styles.kmRow}>
            <Text style={styles.muted}>1 km</Text>
            <Text style={styles.muted}>100 km</Text>
          </View>
        </Card>

        <Card title="Search by branch type">
          <Dropdown text="All types" />
        </Card>

        <Card title="Search by service">
          <Dropdown text="All services" />
        </Card>

        <Card title="Search by ATM type">
          <Check text="Indoor" />
          <Check text="Outdoor" />
        </Card>

        <Card title="Search ATM by service">
          <Dropdown text="All services" />
        </Card>

        <YellowButton title="Apply filters" onPress={onBack} />
      </ScrollView>
    </View>
  );
}

function Card({ title, children }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.line} />
      {children}
    </View>
  );
}

function Box({ text, active }: { text: string; active?: boolean }) {
  return (
    <View style={[styles.box, active && styles.boxActive]}>
      <Text style={styles.boxText}>{text}</Text>
    </View>
  );
}

function Dropdown({ text }: { text: string }) {
  return (
    <View style={styles.dropdown}>
      <Ionicons name="caret-down" size={20} color={colors.yellow} />
      <Text style={styles.dropdownText}>{text}</Text>
    </View>
  );
}

function Check({ text }: { text: string }) {
  return (
    <View style={styles.checkRow}>
      <View style={styles.checkBox}>
        <Ionicons name="checkmark" size={26} color="#111" />
      </View>
      <Text style={styles.checkText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    height: 110,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 18,
  },
  back: {
    position: "absolute",
    left: 20,
    bottom: 10,
    width: 62,
    height: 62,
    borderRadius: 40,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  clear: {
    position: "absolute",
    right: 20,
    bottom: 10,
    height: 62,
    paddingHorizontal: 22,
    borderRadius: 40,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  clearText: { color: colors.white, fontSize: 22 },
  title: { color: colors.white, fontSize: 24, fontWeight: "800" },
  content: { padding: 22, paddingBottom: 140, gap: 22 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 22,
    gap: 18,
  },
  cardTitle: { color: colors.white, fontSize: 24 },
  line: { height: 1, backgroundColor: "#A0A0A0" },
  segmentRow: { flexDirection: "row", gap: 10 },
  box: {
    flex: 1,
    backgroundColor: "#A9A9A9",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  boxActive: { backgroundColor: colors.yellow },
  boxText: { color: "#000", fontSize: 20, fontWeight: "800" },
  radiusRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { color: colors.white, fontSize: 23 },
  input: {
    width: 190,
    height: 54,
    backgroundColor: "#000",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 14,
  },
  inputText: { color: colors.white, fontSize: 22 },
  slider: { height: 8, backgroundColor: "#AAAAAA", borderRadius: 10 },
  sliderActive: { width: 100, height: 8, backgroundColor: colors.yellow, borderRadius: 10 },
  thumb: {
    position: "absolute",
    left: 80,
    top: -10,
    width: 56,
    height: 28,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
  kmRow: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted, fontSize: 17 },
  dropdown: {
    height: 62,
    borderWidth: 2,
    borderColor: colors.yellow,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  dropdownText: { color: colors.white, fontSize: 23, marginLeft: "auto" },
  checkRow: { flexDirection: "row", alignItems: "center", gap: 18 },
  checkBox: {
    width: 42,
    height: 42,
    borderWidth: 3,
    borderColor: colors.yellow,
    backgroundColor: colors.yellow,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  checkText: { color: colors.muted, fontSize: 20 },
});