import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";

import ActivationScreen from "./screens/ActivationScreen";
import LocationsScreen from "./screens/LocationScreen";
import ProductsScreen from "./screens/ProductsScreen";
import MoreScreen from "./screens/MoreScreen";
import SmartScreen from "./screens/SmartScreen";
import FiltersScreen from "./screens/FiltersScreen";
import BottomTabBar from "./components/BottomTabBar";
import { colors } from "./components/theme";

type Tab = "Activation" | "Locations" | "Products" | "Smart" | "More";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("Activation");
  const [showFilters, setShowFilters] = useState(false);

  const renderScreen = () => {
    if (showFilters) {
      return <FiltersScreen onBack={() => setShowFilters(false)} />;
    }

    if (activeTab === "Activation") return <ActivationScreen />;

    if (activeTab === "Locations") {
      return <LocationsScreen onOpenFilters={() => setShowFilters(true)} />;
    }

    if (activeTab === "Products") return <ProductsScreen />;
    if (activeTab === "Smart") return <SmartScreen />;

    return <MoreScreen />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.screen}>{renderScreen()}</View>

      {!showFilters && (
        <BottomTabBar active={activeTab} onChange={setActiveTab} />
      )}

      {showFilters && (
        <BottomTabBar active="Locations" onChange={setActiveTab} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  screen: {
    flex: 1,
  },
});