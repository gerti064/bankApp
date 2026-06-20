
import { useMemo, useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { colors, radius } from "../components/theme";

type Person = {
  id: string;
  name: string;
  initials: string;
};

type ReceiptItem = {
  id: string;
  name: string;
  amount: number;
};

const people: Person[] = [
  {
    id: "gerti",
    name: "Gerti",
    initials: "GR",
  },
  {
    id: "ana",
    name: "Ana",
    initials: "AN",
  },
  {
    id: "leon",
    name: "Leon",
    initials: "LE",
  },
  {
    id: "sara",
    name: "Sara",
    initials: "SA",
  },
];

const receiptItems: ReceiptItem[] = [
  {
    id: "pizza",
    name: "Margherita Pizza",
    amount: 12,
  },
  {
    id: "pasta",
    name: "Chicken Pasta",
    amount: 15,
  },
  {
    id: "salad",
    name: "Caesar Salad",
    amount: 10,
  },
  {
    id: "drinks",
    name: "Drinks",
    amount: 16,
  },
  {
    id: "dessert",
    name: "Dessert",
    amount: 11,
  },
];

export default function BillSplitScreen() {
  const [scanned, setScanned] = useState(false);

  const [selectedPeople, setSelectedPeople] =
    useState<string[]>(
      people.map((person) => person.id)
    );

  const subtotal = useMemo(() => {
    return receiptItems.reduce(
      (total, item) => total + item.amount,
      0
    );
  }, []);

  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  const amountPerPerson =
    selectedPeople.length > 0
      ? total / selectedPeople.length
      : 0;

  const togglePerson = (personId: string) => {
    setSelectedPeople((currentPeople) => {
      if (currentPeople.includes(personId)) {
        return currentPeople.filter(
          (id) => id !== personId
        );
      }

      return [...currentPeople, personId];
    });
  };

  const resetReceipt = () => {
    setScanned(false);

    setSelectedPeople(
      people.map((person) => person.id)
    );
  };

  if (!scanned) {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scanContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scanCard}>
            <View style={styles.scanFrame}>
              <View
                style={[
                  styles.scanCorner,
                  styles.topLeft,
                ]}
              />

              <View
                style={[
                  styles.scanCorner,
                  styles.topRight,
                ]}
              />

              <View
                style={[
                  styles.scanCorner,
                  styles.bottomLeft,
                ]}
              />

              <View
                style={[
                  styles.scanCorner,
                  styles.bottomRight,
                ]}
              />

              <Ionicons
                name="receipt-outline"
                size={80}
                color={colors.yellow}
              />

              <View style={styles.scanLine} />
            </View>

            <Text style={styles.scanTitle}>
              Scan Your Restaurant Bill
            </Text>

            <Text style={styles.scanDescription}>
              AI will detect every item, calculate the
              total and prepare payment requests for
              your friends.
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.scanButton,
                pressed && styles.pressed,
              ]}
              onPress={() => setScanned(true)}
            >
              <Ionicons
                name="scan"
                size={23}
                color="#111111"
              />

              <Text style={styles.scanButtonText}>
                Scan Bill With AI
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.uploadButton,
                pressed && styles.pressed,
              ]}
              onPress={() => setScanned(true)}
            >
              <Ionicons
                name="image-outline"
                size={20}
                color={colors.yellow}
              />

              <Text style={styles.uploadButtonText}>
                Choose From Gallery
              </Text>
            </Pressable>
          </View>

          <View style={styles.securityCard}>
            <Ionicons
              name="shield-checkmark-outline"
              size={24}
              color={colors.yellow}
            />

            <View style={styles.securityInformation}>
              <Text style={styles.securityTitle}>
                Secure Receipt Processing
              </Text>

              <Text style={styles.securityDescription}>
                Receipt information is only used to
                calculate and create the bill split.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.successCard}>
          <View style={styles.successIcon}>
            <Ionicons
              name="sparkles"
              size={27}
              color="#111111"
            />
          </View>

          <View style={styles.successInformation}>
            <Text style={styles.successTitle}>
              AI Scan Completed
            </Text>

            <Text style={styles.successSubtitle}>
              5 items detected with 98% confidence
            </Text>
          </View>

          <Ionicons
            name="checkmark-circle"
            size={27}
            color={colors.yellow}
          />
        </View>

        <View style={styles.restaurantHeader}>
          <View>
            <Text style={styles.restaurantLabel}>
              Restaurant
            </Text>

            <Text style={styles.restaurantName}>
              Central Bistro
            </Text>
          </View>

          <Text style={styles.receiptDate}>
            20 Jun 2026
          </Text>
        </View>

        <View style={styles.receiptCard}>
          {receiptItems.map((item) => (
            <View
              key={item.id}
              style={styles.receiptRow}
            >
              <Text style={styles.receiptItem}>
                {item.name}
              </Text>

              <Text style={styles.receiptAmount}>
                €{item.amount.toFixed(2)}
              </Text>
            </View>
          ))}

          <View style={styles.receiptDivider} />

          <View style={styles.receiptRow}>
            <Text style={styles.receiptSecondary}>
              Subtotal
            </Text>

            <Text style={styles.receiptSecondary}>
              €{subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.receiptRow}>
            <Text style={styles.receiptSecondary}>
              Service Charge
            </Text>

            <Text style={styles.receiptSecondary}>
              €{serviceFee.toFixed(2)}
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total
            </Text>

            <Text style={styles.totalAmount}>
              €{total.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View style={styles.sectionInformation}>
            <Text style={styles.sectionTitle}>
              Who Is Splitting?
            </Text>

            <Text style={styles.sectionSubtitle}>
              Press a friend to add or remove them
            </Text>
          </View>

          <Text style={styles.selectedCount}>
            {selectedPeople.length} selected
          </Text>
        </View>

        <View style={styles.peopleGrid}>
          {people.map((person) => {
            const selected =
              selectedPeople.includes(person.id);

            return (
              <Pressable
                key={person.id}
                style={({ pressed }) => [
                  styles.personCard,
                  selected &&
                    styles.personCardSelected,
                  pressed && styles.pressed,
                ]}
                onPress={() =>
                  togglePerson(person.id)
                }
              >
                <View
                  style={[
                    styles.avatar,
                    selected &&
                      styles.avatarSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.avatarText,
                      selected &&
                        styles.avatarTextSelected,
                    ]}
                  >
                    {person.initials}
                  </Text>
                </View>

                <Text style={styles.personName}>
                  {person.name}
                </Text>

                <Ionicons
                  name={
                    selected
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={20}
                  color={
                    selected
                      ? colors.yellow
                      : colors.muted
                  }
                />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.aiResultCard}>
          <View style={styles.aiResultHeader}>
            <View style={styles.aiSmallIcon}>
              <Ionicons
                name="sparkles"
                size={20}
                color="#111111"
              />
            </View>

            <Text style={styles.aiResultTitle}>
              AI Recommended Split
            </Text>
          </View>

          {selectedPeople.length > 0 ? (
            <>
              <Text style={styles.perPersonLabel}>
                Each selected person pays
              </Text>

              <Text style={styles.perPersonAmount}>
                €{amountPerPerson.toFixed(2)}
              </Text>

              <Text style={styles.aiExplanation}>
                The bill is currently divided equally
                between all selected people.
              </Text>
            </>
          ) : (
            <Text style={styles.noPeopleText}>
              Select at least one person to calculate
              the split.
            </Text>
          )}
        </View>

        <Pressable
          disabled={selectedPeople.length === 0}
          style={({ pressed }) => [
            styles.requestButton,
            selectedPeople.length === 0 &&
              styles.requestButtonDisabled,
            pressed &&
              selectedPeople.length > 0 &&
              styles.pressed,
          ]}
          onPress={() =>
            Alert.alert(
              "Payment Requests Created",
              `${selectedPeople.length} payment request${
                selectedPeople.length === 1 ? "" : "s"
              } of €${amountPerPerson.toFixed(
                2
              )} have been prepared.`
            )
          }
        >
          <Ionicons
            name="paper-plane"
            size={21}
            color={
              selectedPeople.length === 0
                ? colors.muted
                : "#111111"
            }
          />

          <Text
            style={[
              styles.requestButtonText,
              selectedPeople.length === 0 &&
                styles.requestButtonTextDisabled,
            ]}
          >
            Send Payment Requests
          </Text>
        </Pressable>

        <Pressable
          style={styles.scanAgainButton}
          onPress={resetReceipt}
        >
          <Text style={styles.scanAgainText}>
            Scan Another Bill
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  scanContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 18,
    paddingBottom: 50,
  },

  content: {
    padding: 18,
    paddingBottom: 60,
  },

  scanCard: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
  },

  scanFrame: {
    width: "100%",
    height: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: "#101010",
    overflow: "hidden",
  },

  scanCorner: {
    position: "absolute",
    width: 35,
    height: 35,
    borderColor: colors.yellow,
  },

  topLeft: {
    top: 15,
    left: 15,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },

  topRight: {
    top: 15,
    right: 15,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },

  bottomLeft: {
    bottom: 15,
    left: 15,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },

  bottomRight: {
    right: 15,
    bottom: 15,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },

  scanLine: {
    position: "absolute",
    left: 25,
    right: 25,
    height: 2,
    backgroundColor: colors.yellow,
  },

  scanTitle: {
    color: colors.white,
    fontSize: 23,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 23,
  },

  scanDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 9,
  },

  scanButton: {
    width: "100%",
    height: 54,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    marginTop: 23,
    gap: 8,
  },

  scanButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
  },

  uploadButton: {
    height: 47,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  uploadButtonText: {
    color: colors.yellow,
    fontWeight: "800",
  },

  securityCard: {
    flexDirection: "row",
    backgroundColor: "#181818",
    borderRadius: radius.md,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 14,
  },

  securityInformation: {
    flex: 1,
    marginLeft: 12,
  },

  securityTitle: {
    color: colors.white,
    fontWeight: "800",
  },

  securityDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },

  successCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },

  successIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },

  successInformation: {
    flex: 1,
    marginLeft: 12,
  },

  successTitle: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },

  successSubtitle: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },

  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 25,
    marginBottom: 13,
  },

  restaurantLabel: {
    color: colors.muted,
    fontSize: 11,
  },

  restaurantName: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 4,
  },

  receiptDate: {
    color: colors.muted,
    fontSize: 12,
  },

  receiptCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  receiptItem: {
    color: colors.white,
    fontSize: 14,
  },

  receiptAmount: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },

  receiptSecondary: {
    color: colors.muted,
    fontSize: 13,
  },

  receiptDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 5,
    marginBottom: 16,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginTop: 3,
  },

  totalLabel: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
  },

  totalAmount: {
    color: colors.yellow,
    fontSize: 23,
    fontWeight: "900",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 27,
    marginBottom: 14,
  },

  sectionInformation: {
    flex: 1,
    marginRight: 10,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },

  selectedCount: {
    color: colors.yellow,
    fontSize: 12,
    fontWeight: "800",
  },

  peopleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },

  personCard: {
    width: "48%",
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 11,
    borderWidth: 1,
    borderColor: colors.border,
  },

  personCardSelected: {
    borderColor: colors.yellow,
    backgroundColor: "#242312",
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303030",
  },

  avatarSelected: {
    backgroundColor: colors.yellow,
  },

  avatarText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
  },

  avatarTextSelected: {
    color: "#111111",
  },

  personName: {
    flex: 1,
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 9,
  },

  aiResultCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 19,
    borderWidth: 1,
    borderColor: colors.yellow,
    marginTop: 24,
  },

  aiResultHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  aiSmallIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },

  aiResultTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 10,
  },

  perPersonLabel: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 19,
  },

  perPersonAmount: {
    color: colors.yellow,
    fontSize: 38,
    fontWeight: "900",
    marginTop: 2,
  },

  aiExplanation: {
    color: "#BDBDBD",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },

  noPeopleText: {
    color: colors.muted,
    lineHeight: 20,
    marginTop: 18,
  },

  requestButton: {
    height: 54,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    marginTop: 17,
    gap: 8,
  },

  requestButtonDisabled: {
    backgroundColor: "#303030",
  },

  requestButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
  },

  requestButtonTextDisabled: {
    color: colors.muted,
  },

  scanAgainButton: {
    alignItems: "center",
    paddingVertical: 18,
  },

  scanAgainText: {
    color: colors.yellow,
    fontWeight: "800",
  },

  pressed: {
    opacity: 0.7,
  },
});
