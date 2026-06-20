import { Text, Pressable, View, StyleSheet } from "react-native";
import { colors, radius } from "./theme";

type Props = {
  left: string;
  right: string;
  active: "left" | "right";
  onChange: (value: "left" | "right") => void;
};

export default function SegmentedControl({ left, right, active, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.item, active === "left" && styles.active]}
        onPress={() => onChange("left")}
      >
        <Text style={[styles.text, active === "left" && styles.activeText]}>{left}</Text>
      </Pressable>

      <Pressable
        style={[styles.item, active === "right" && styles.active]}
        onPress={() => onChange("right")}
      >
        <Text style={[styles.text, active === "right" && styles.activeText]}>{right}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 18,
    height: 52,
    backgroundColor: "#303036",
    borderRadius: radius.xl,
    flexDirection: "row",
    padding: 3,
  },
  item: {
    flex: 1,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: colors.yellow,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  activeText: {
    color: "#000",
  },
});