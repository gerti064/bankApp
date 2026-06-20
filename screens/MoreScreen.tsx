import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import MenuRow from "../components/MenuRow";
import SectionTitle from "../components/SectionTitle";
import SettingSwitch from "../components/SettingSwitch";
import { colors } from "../components/theme";

export default function MoreScreen() {
  return (
    <View style={styles.container}>
      <Header title="More" />

      <ScrollView contentContainerStyle={styles.content}>
        <SectionTitle title="Tools" />
        <MenuRow title="Calculator of savings or loans" icon="calculator-variant-outline" />
        <MenuRow title="Exchange rates" icon="cash-multiple" />
        <MenuRow title="Currency calculator" icon="currency-eur" />

        <SectionTitle title="About the app" />
        <MenuRow title="English" icon="translate" />
        <View style={styles.switchOverlay}>
          <SettingSwitch />
        </View>

        <MenuRow title="Dark Theme" icon="theme-light-dark" />
        <View style={[styles.switchOverlay, { top: 380 }]}>
          <SettingSwitch />
        </View>

        <MenuRow title="On-boarding" icon="cellphone-arrow-down" />
        <MenuRow title="FAQ" icon="head-question-outline" />
        <MenuRow title="Safety Measures" icon="shield-check-outline" />

        <SectionTitle title="About the Bank" />
        <MenuRow title="Basic information" icon="bank" />
        <MenuRow title="Contact" icon="contacts-outline" />
        <MenuRow title="Follow us" icon="account-heart-outline" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: 130 },
  switchOverlay: {
    position: "absolute",
    right: 22,
    top: 308,
  },
});