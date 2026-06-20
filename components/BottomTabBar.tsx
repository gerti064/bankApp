import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, radius } from "./theme";

type Tab =
  | "Activation"
  | "Locations"
  | "Products"
  | "Smart"
  | "More";

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
    { name: "Smart", icon: "sparkles", lib: "ion" },
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
                size={26}
                color={selected ? colors.yellow : colors.white}
              />
            ) : (
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={26}
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
    left: 12,
    right: 12,
    bottom: 20,
    height: 88,
    backgroundColor: colors.tab,
    borderRadius: radius.xl,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderWidth: 1,
    borderColor: "#2A2A2A",
  },

  tab: {
    flex: 1,
    height: 78,
    borderRadius: radius.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },

  activeTab: {
    backgroundColor: colors.activeTab,
  },

  label: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "600",
  },

  activeLabel: {
    color: colors.yellow,
  },
});