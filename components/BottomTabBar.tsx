import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radius } from "./theme";

type Tab = "Activation" | "Locations" | "Products" | "More";

type Props = {
  active: Tab;
  onChange: (tab: Tab) => void;
};

export default function BottomTabBar({ active, onChange }: Props) {
  const tabs: {
    name: Tab;
    icon: string;
    lib: "ion" | "mci";
  }[] = [
    { name: "Activation", icon: "home", lib: "ion" },
    { name: "Locations", icon: "location", lib: "ion" },
    { name: "Products", icon: "file-document-outline", lib: "mci" },
    { name: "More", icon: "ellipsis-horizontal-circle", lib: "ion" },
  ];

  return (
    <View style={styles.wrapper}>
      {tabs.map((tab) => {
        const selected = active === tab.name;

        return (
          <Pressable
            key={tab.name}
            style={[styles.tab, selected && styles.activeTab]}
            onPress={() => onChange(tab.name)}
          >
            {tab.lib === "ion" ? (
              <Ionicons
                name={tab.icon as any}
                size={32}
                color={selected ? colors.yellow : colors.white}
              />
            ) : (
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={32}
                color={selected ? colors.yellow : colors.white}
              />
            )}

            <Text style={[styles.label, selected && styles.activeLabel]}>
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 26,
    height: 86,
    backgroundColor: colors.tab,
    borderRadius: radius.xl,
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },
  tab: {
    flex: 1,
    height: 74,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  activeTab: {
    backgroundColor: colors.activeTab,
  },
  label: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "600",
  },
  activeLabel: {
    color: colors.yellow,
  },
});