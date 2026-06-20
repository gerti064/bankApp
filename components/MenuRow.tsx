import { Text, View, Pressable, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "./theme";

type Props = {
  title: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress?: () => void;
};

export default function MenuRow({ title, icon = "bank", onPress }: Props) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={28} color="#DADADA" />
      <Text style={styles.title}>{title}</Text>
      <Ionicons name="chevron-forward" size={24} color="#555" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 22,
    gap: 18,
  },
  title: {
    color: colors.white,
    fontSize: 22,
    flex: 1,
  },
});