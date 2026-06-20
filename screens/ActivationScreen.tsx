import { useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import YellowButton from "../components/YellowButton";
import { colors, radius } from "../components/theme";

const backgroundImage = {
  uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
};

export default function ActivationScreen() {
  const [showActivation, setShowActivation] = useState(false);

  if (showActivation) {
    return (
      <ImageBackground source={backgroundImage} style={styles.formContainer}>
        <View style={styles.formOverlay}>
          <View style={styles.topRow}>
            <Pressable
              style={styles.backBtn}
              onPress={() => setShowActivation(false)}
            >
              <Ionicons name="chevron-back" size={36} color={colors.white} />
            </Pressable>

            <View style={styles.progress}>
              <View style={styles.progressFill} />
            </View>
          </View>

          <View style={styles.formLogoBox}>
            <Image
              source={require("../assets/raiffeisen-logo.png")}
              style={styles.formLogo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="person" size={30} color="#DADADA" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#9A9A9A"
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed" size={28} color="#DADADA" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9A9A9A"
              secureTextEntry
            />
          </View>

          <Text style={styles.helpText}>
            Enter the activation details you received from the Bank
          </Text>

          <Text style={styles.linkText}>
            If you need new access data, click here
          </Text>

          <View style={styles.bottomArea}>
            <Pressable style={styles.disabledButton}>
              <Text style={styles.disabledButtonText}>Activate the app</Text>
            </Pressable>

            <Text style={styles.footerText}>
              Please contact us if you need any help with the activation.
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.overlay} />

      <View style={styles.logoBox}>
        <Image
          source={require("../assets/raiffeisen-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.buttonWrap}>
        <YellowButton
          title="Application activation"
          onPress={() => setShowActivation(true)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  logoBox: {
    marginTop: 180,
    alignSelf: "center",
    alignItems: "center",
  },

  logo: {
    width: 660,
    height: 260,
  },

  buttonWrap: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 130,
  },

  formContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  formOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.88)",
    paddingHorizontal: 24,
  },

  topRow: {
    marginTop: 36,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    gap: 28,
  },

  backBtn: {
    width: 58,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#151515",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    alignItems: "center",
    justifyContent: "center",
  },

  progress: {
    flex: 1,
    height: 8,
    borderRadius: 20,
    backgroundColor: "#9A9A9A",
    overflow: "hidden",
  },

  progressFill: {
    width: "33%",
    height: "100%",
    backgroundColor: colors.yellow,
  },

  formLogoBox: {
    marginTop: 130,
    marginBottom: 85,
    alignSelf: "center",
    alignItems: "center",
  },

  formLogo: {
    width: 320,
    height: 120,
  },

  inputBox: {
    height: 78,
    backgroundColor: "rgba(35,35,40,0.95)",
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    marginBottom: 18,
    gap: 18,
  },

  input: {
    flex: 1,
    color: colors.white,
    fontSize: 20,
  },

  helpText: {
    color: colors.muted,
    fontSize: 16,
    textAlign: "center",
    marginTop: 4,
  },

  linkText: {
    color: colors.white,
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
    textDecorationLine: "underline",
  },

  bottomArea: {
    marginTop: "auto",
    paddingBottom: 135,
  },

  disabledButton: {
    height: 72,
    borderRadius: radius.md,
    backgroundColor: "#1B1B1B",
    alignItems: "center",
    justifyContent: "center",
  },

  disabledButtonText: {
    color: "#333333",
    fontSize: 22,
    fontWeight: "800",
  },

  footerText: {
    color: colors.muted,
    fontSize: 18,
    textAlign: "center",
    marginTop: 34,
    lineHeight: 24,
  },
});