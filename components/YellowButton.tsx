import { Text, Pressable, StyleSheet } from "react-native";
import { colors, radius } from "./theme";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function YellowButton({ title, onPress }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.yellow,
    height: 58,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
    fontSize: 18,
    fontWeight: "700",
  },
});