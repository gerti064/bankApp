import { Text, View, StyleSheet } from "react-native";
import { colors } from "./theme";

type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    paddingHorizontal: 22,
    paddingVertical: 14,
  },
  text: {
    color: colors.white,
    fontSize: 23,
    fontWeight: "800",
  },
});