import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import SegmentedControl from "../components/SegmentedControl";
import { colors } from "../components/theme";

type Props = {
  onOpenFilters: () => void;
};

export default function LocationsScreen({ onOpenFilters }: Props) {
  const [tab, setTab] = useState<"left" | "right">("left");

  return (
    <View style={styles.container}>
      <Header title="Locations" />

      <Pressable style={styles.filterBtn} onPress={onOpenFilters}>
        <Ionicons name="options-outline" size={30} color={colors.white} />
      </Pressable>

      <SegmentedControl left="Map" right="List" active={tab} onChange={setTab} />

      {tab === "left" ? (
        <View style={styles.fakeMap}>
          <Text style={styles.mapCity}>Tirana</Text>
          <Text style={styles.mapCountry}>ALBANIA</Text>

          <View style={styles.locationDot} />

          <View style={styles.roadOne} />
          <View style={styles.roadTwo} />
          <View style={styles.roadThree} />

          <View style={styles.mapButtonTop}>
            <Ionicons name="navigate" size={30} color="#000" />
          </View>

          <View style={styles.mapButtonBottom}>
            <Ionicons name="business-outline" size={30} color="#000" />
          </View>
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No locations to display</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.bg 
  },

  filterBtn: {
    position: "absolute",
    top: 58,
    right: 24,
    width: 54,
    height: 54,
    borderRadius: 30,
    backgroundColor: "#171717",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A2A2A",
    zIndex: 10,
  },

  fakeMap: {
    flex: 1,
    marginBottom: 100,
    backgroundColor: "#24574D",
    position: "relative",
    overflow: "hidden",
  },

  mapCity: {
    position: "absolute",
    top: 170,
    left: 145,
    color: "#E5E5E5",
    fontSize: 28,
    fontWeight: "800",
  },

  mapCountry: {
    position: "absolute",
    top: 260,
    left: 150,
    color: "#BDBDBD",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },

  locationDot: {
    position: "absolute",
    top: 190,
    left: 135,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.yellow,
    borderWidth: 5,
    borderColor: "#DADADA",
  },

  roadOne: {
    position: "absolute",
    top: 210,
    left: -60,
    width: 520,
    height: 3,
    backgroundColor: "rgba(210,210,210,0.35)",
    transform: [{ rotate: "-25deg" }],
  },

  roadTwo: {
    position: "absolute",
    top: 420,
    left: -40,
    width: 520,
    height: 3,
    backgroundColor: "rgba(210,210,210,0.3)",
    transform: [{ rotate: "18deg" }],
  },

  roadThree: {
    position: "absolute",
    top: 110,
    left: 190,
    width: 3,
    height: 700,
    backgroundColor: "rgba(210,210,210,0.22)",
    transform: [{ rotate: "12deg" }],
  },

  mapButtonTop: {
    position: "absolute",
    top: 90,
    right: 20,
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#000",
  },

  mapButtonBottom: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 62,
    height: 62,
    borderRadius: 14,
    backgroundColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#000",
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 120,
  },

  emptyText: { 
    color: colors.white, 
    fontSize: 22 
  },
});