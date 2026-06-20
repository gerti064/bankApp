import { Text, View, StyleSheet } from "react-native";
import { colors } from "./theme";

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 95,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 18,
    backgroundColor: colors.bg,
    borderBottomWidth: 1,
    borderBottomColor: "#151515",
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
  },
});