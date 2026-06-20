import { View, StyleSheet } from "react-native";
import { colors } from "./theme";

type Props = {
  enabled?: boolean;
};

export default function SettingSwitch({ enabled = true }: Props) {
  return (
    <View style={[styles.track, enabled && styles.enabled]}>
      <View style={styles.thumb} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 70,
    height: 38,
    borderRadius: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 4,
  },
  enabled: {
    backgroundColor: colors.yellow,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.white,
  },
});