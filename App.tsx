import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import ActivationScreen from "./screens/ActivationScreen";
import LocationsScreen from "./screens/LocationScreen";
import ProductsScreen from "./screens/ProductsScreen";
import SmartScreen from "./screens/SmartScreen";
import MoreScreen from "./screens/MoreScreen";
import FiltersScreen from "./screens/FiltersScreen";

import SavingPlanScreen from "./screens/SavingPlanScreen";
import TripBalanceScreen from "./screens/TripBalanceScreen";
import BillSplitScreen from "./screens/BillSplitScreen";
import MoneyWrappedScreen from "./screens/MoneyWrappedScreen";
import FinancialCoachScreen from "./screens/FinancialCoachScreen";

import BottomTabBar from "./components/BottomTabBar";
import { colors } from "./components/theme";

import { RootStackParamList } from "./navigationTypes";

type Tab =
  | "Activation"
  | "Locations"
  | "Products"
  | "Smart"
  | "More";

const Stack =
  createNativeStackNavigator<RootStackParamList>();

function MainTabsScreen() {
  const [activeTab, setActiveTab] =
    useState<Tab>("Activation");

  const [showFilters, setShowFilters] =
    useState(false);

  const changeTab = (tab: Tab) => {
    setActiveTab(tab);
    setShowFilters(false);
  };

  const renderScreen = () => {
    if (showFilters) {
      return (
        <FiltersScreen
          onBack={() => setShowFilters(false)}
        />
      );
    }

    if (activeTab === "Activation") {
      return <ActivationScreen />;
    }

    if (activeTab === "Locations") {
      return (
        <LocationsScreen
          onOpenFilters={() =>
            setShowFilters(true)
          }
        />
      );
    }

    if (activeTab === "Products") {
      return <ProductsScreen />;
    }

    if (activeTab === "Smart") {
      return <SmartScreen />;
    }

    return <MoreScreen />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        {renderScreen()}
      </View>

      <BottomTabBar
        active={
          showFilters
            ? "Locations"
            : activeTab
        }
        onChange={changeTab}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />

      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bg,
          },

          headerTintColor: colors.white,

          headerTitleStyle: {
            fontWeight: "800",
          },

          headerShadowVisible: false,

          contentStyle: {
            backgroundColor: colors.bg,
          },

          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTabsScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SavingPlan"
          component={SavingPlanScreen}
          options={{
            title: "Saving Plans",
          }}
        />

        <Stack.Screen
          name="TripBalance"
          component={TripBalanceScreen}
          options={{
            title: "Trip Spend Balance",
          }}
        />

        <Stack.Screen
          name="BillSplit"
          component={BillSplitScreen}
          options={{
            title: "AI Balance Split",
          }}
        />

        <Stack.Screen
          name="MoneyWrapped"
          component={MoneyWrappedScreen}
          options={{
            title: "Money Wrapped",
          }}
        />

        <Stack.Screen
          name="FinancialCoach"
          component={FinancialCoachScreen}
          options={{
            title: "AI Financial Coach",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
