import { ImageBackground, StyleSheet, Text, View } from "react-native";
import YellowButton from "../components/YellowButton";
import { colors } from "../components/theme";

export default function ActivationScreen() {
  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" }}
      style={styles.container}
    >
      <View style={styles.overlay} />

      <View style={styles.logoBox}>
        <Text style={styles.logoIcon}>✖</Text>
        <Text style={styles.logoText}>Raiffeisen{"\n"}Bank</Text>
      </View>

      <View style={styles.buttonWrap}>
        <YellowButton title="Application activation" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.15)" },
  logoBox: {
    marginTop: 250,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  logoIcon: { color: colors.white, fontSize: 70, fontWeight: "900" },
  logoText: { color: colors.white, fontSize: 36, fontWeight: "900", lineHeight: 38 },
  buttonWrap: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 130,
  },
});