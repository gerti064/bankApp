import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import SegmentedControl from "../components/SegmentedControl";
import MenuRow from "../components/MenuRow";
import { colors } from "../components/theme";

type Props = {
  onOpenFilters: () => void;
};

const mapHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <style>
    html, body, #map {
      height: 100%;
      margin: 0;
      background: #000;
    }
    .leaflet-control-attribution {
      display: none;
    }
    .marker {
      width: 34px;
      height: 34px;
      background: #F4D83D;
      border: 5px solid #111;
      border-radius: 50%;
      box-shadow: 0 4px 16px rgba(0,0,0,0.45);
    }
  </style>
</head>
<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView([41.3275, 19.8187], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: '<div class="marker"></div>',
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    L.marker([41.3275, 19.8187], { icon }).addTo(map);
    L.marker([41.3180, 19.8210], { icon }).addTo(map);
    L.marker([41.3350, 19.8100], { icon }).addTo(map);
  </script>
</body>
</html>
`;

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
        <View style={styles.mapContainer}>
          <WebView
            originWhitelist={["*"]}
            source={{ html: mapHtml }}
            style={styles.webMap}
            javaScriptEnabled
            domStorageEnabled
          />

          <View style={styles.mapButtonTop}>
            <Ionicons name="navigate" size={30} color="#000" />
          </View>

          <View style={styles.mapButtonBottom}>
            <Ionicons name="business-outline" size={30} color="#000" />
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Nearby locations</Text>

          <MenuRow title="Raiffeisen Bank - Tirana Center" icon="bank-outline" />
          <MenuRow title="ATM - Blloku" icon="cash-multiple" />
          <MenuRow title="Branch - Skanderbeg Square" icon="office-building-marker" />
          <MenuRow title="ATM - New Bazaar" icon="credit-card-outline" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
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
    zIndex: 20,
  },

  mapContainer: {
    flex: 1,
    marginBottom: 100,
    backgroundColor: "#000",
    overflow: "hidden",
  },

  webMap: {
    flex: 1,
    backgroundColor: "#000",
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
    zIndex: 10,
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
    zIndex: 10,
  },

  listContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 120,
    backgroundColor: colors.bg,
  },

  listTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "800",
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
});