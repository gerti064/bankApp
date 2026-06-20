
import { useMemo, useState } from "react";

import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { colors, radius } from "../components/theme";

type Member = {
  id: string;
  name: string;
  initials: string;
  contribution: number;
  isCurrentUser?: boolean;
};

type TripTransaction = {
  id: string;
  merchant: string;
  paidBy: string;
  amount: number;
  icon: keyof typeof Ionicons.glyphMap;
};

const initialMembers: Member[] = [
  {
    id: "gerti",
    name: "Gerti",
    initials: "GR",
    contribution: 350,
    isCurrentUser: true,
  },
  {
    id: "ana",
    name: "Ana",
    initials: "AN",
    contribution: 300,
  },
  {
    id: "leon",
    name: "Leon",
    initials: "LE",
    contribution: 250,
  },
  {
    id: "sara",
    name: "Sara",
    initials: "SA",
    contribution: 300,
  },
];

const transactions: TripTransaction[] = [
  {
    id: "hotel",
    merchant: "Hotel Tirana",
    paidBy: "Gerti",
    amount: 240,
    icon: "bed-outline",
  },
  {
    id: "restaurant",
    merchant: "Seaside Restaurant",
    paidBy: "Ana",
    amount: 86,
    icon: "restaurant-outline",
  },
  {
    id: "taxi",
    merchant: "Airport Taxi",
    paidBy: "Leon",
    amount: 24,
    icon: "car-outline",
  },
];

function parseMoney(value: string) {
  return Number(value.replace(",", "."));
}

export default function TripBalanceScreen() {
  const [members, setMembers] =
    useState<Member[]>(initialMembers);

  const [personalBalance, setPersonalBalance] =
    useState(3250);

  const [amount, setAmount] = useState("");

  const [modalVisible, setModalVisible] =
    useState(false);

  const [cardFrozen, setCardFrozen] =
    useState(false);

  const totalContribution = useMemo(() => {
    return members.reduce(
      (total, member) =>
        total + member.contribution,
      0
    );
  }, [members]);

  const totalSpent = useMemo(() => {
    return transactions.reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );
  }, []);

  const tripBalance =
    totalContribution - totalSpent;

  const addMoney = () => {
    const numericAmount = parseMoney(amount);

    if (
      Number.isNaN(numericAmount) ||
      numericAmount <= 0
    ) {
      Alert.alert(
        "Invalid amount",
        "Enter an amount greater than zero."
      );

      return;
    }

    if (numericAmount > personalBalance) {
      Alert.alert(
        "Insufficient balance",
        "You do not have enough money in your personal account."
      );

      return;
    }

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.isCurrentUser
          ? {
              ...member,
              contribution:
                member.contribution + numericAmount,
            }
          : member
      )
    );

    setPersonalBalance(
      (currentBalance) =>
        currentBalance - numericAmount
    );

    setAmount("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tripHeader}>
          <View>
            <Text style={styles.tripLabel}>
              Active Shared Trip
            </Text>

            <Text style={styles.tripTitle}>
              Summer in Greece
            </Text>

            <Text style={styles.tripDate}>
              12–20 August 2026
            </Text>
          </View>

          <View style={styles.tripIcon}>
            <Ionicons
              name="airplane"
              size={28}
              color="#111111"
            />
          </View>
        </View>

        <View
          style={[
            styles.bankCard,
            cardFrozen && styles.bankCardFrozen,
          ]}
        >
          <View style={styles.cardTopRow}>
            <Text style={styles.cardBrand}>
              RAIFFEISEN YOUTH
            </Text>

            <Ionicons
              name={
                cardFrozen
                  ? "lock-closed"
                  : "wifi"
              }
              size={23}
              color="#111111"
            />
          </View>

          <View>
            <Text style={styles.cardBalanceLabel}>
              Available Trip Balance
            </Text>

            <Text style={styles.cardBalance}>
              €{tripBalance.toFixed(2)}
            </Text>
          </View>

          <Text style={styles.cardNumber}>
            •••• 4582
          </Text>

          <View style={styles.cardBottomRow}>
            <Text style={styles.cardBottomText}>
              SUMMER GREECE
            </Text>

            <Text style={styles.cardBottomText}>
              08/26
            </Text>
          </View>

          {cardFrozen && (
            <View style={styles.frozenOverlay}>
              <Ionicons
                name="lock-closed"
                size={25}
                color={colors.white}
              />

              <Text style={styles.frozenText}>
                Card Frozen
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              setModalVisible(true)
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="add"
                size={25}
                color="#111111"
              />
            </View>

            <Text style={styles.actionLabel}>
              Add Money
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              Alert.alert(
                "Invite Friends",
                "A secure trip invitation link has been created."
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name="person-add"
                size={22}
                color="#111111"
              />
            </View>

            <Text style={styles.actionLabel}>
              Invite
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.action,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              setCardFrozen(
                (current) => !current
              )
            }
          >
            <View style={styles.actionIcon}>
              <Ionicons
                name={
                  cardFrozen
                    ? "lock-open"
                    : "lock-closed"
                }
                size={22}
                color="#111111"
              />
            </View>

            <Text style={styles.actionLabel}>
              {cardFrozen
                ? "Unfreeze"
                : "Freeze"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              Group Added
            </Text>

            <Text style={styles.summaryValue}>
              €{totalContribution.toFixed(0)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              Group Spent
            </Text>

            <Text style={styles.summaryValue}>
              €{totalSpent.toFixed(0)}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Trip Members
          </Text>

          <Text style={styles.memberCount}>
            {members.length} members
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.membersRow}
        >
          {members.map((member) => (
            <View
              key={member.id}
              style={styles.memberCard}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {member.initials}
                </Text>
              </View>

              <Text style={styles.memberName}>
                {member.name}
              </Text>

              <Text style={styles.memberAmount}>
                €{member.contribution.toFixed(0)}
              </Text>

              {member.isCurrentUser && (
                <Text style={styles.youLabel}>
                  You
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Trip Spending
          </Text>

          <Text style={styles.memberCount}>
            Recent
          </Text>
        </View>

        {transactions.map((transaction) => (
          <View
            key={transaction.id}
            style={styles.transactionCard}
          >
            <View style={styles.transactionIcon}>
              <Ionicons
                name={transaction.icon}
                size={23}
                color={colors.yellow}
              />
            </View>

            <View
              style={styles.transactionInformation}
            >
              <Text
                style={styles.transactionMerchant}
              >
                {transaction.merchant}
              </Text>

              <Text
                style={styles.transactionPerson}
              >
                Paid using the shared card by{" "}
                {transaction.paidBy}
              </Text>
            </View>

            <Text style={styles.transactionAmount}>
              -€{transaction.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() =>
          setModalVisible(false)
        }
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalTitle}>
              Add Money to Trip
            </Text>

            <Text style={styles.modalSubtitle}>
              The money will move from your personal
              balance to the temporary shared card.
            </Text>

            <View style={styles.modalBalance}>
              <Text style={styles.modalBalanceLabel}>
                Personal Balance
              </Text>

              <Text style={styles.modalBalanceValue}>
                €{personalBalance.toFixed(2)}
              </Text>
            </View>

            <Text style={styles.inputLabel}>
              Amount
            </Text>

            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={styles.input}
              placeholder="Enter amount"
              placeholderTextColor="#777777"
              keyboardType="decimal-pad"
              autoFocus
            />

            <Pressable
              style={({ pressed }) => [
                styles.confirmButton,
                pressed && styles.pressed,
              ]}
              onPress={addMoney}
            >
              <Text
                style={styles.confirmButtonText}
              >
                Add to Shared Card
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() => {
                setAmount("");
                setModalVisible(false);
              }}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  content: {
    padding: 18,
    paddingBottom: 60,
  },

  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  tripLabel: {
    color: colors.muted,
    fontSize: 12,
  },

  tripTitle: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 4,
  },

  tripDate: {
    color: "#B7B7B7",
    fontSize: 13,
    marginTop: 5,
  },

  tripIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },

  bankCard: {
    minHeight: 225,
    borderRadius: 25,
    padding: 22,
    justifyContent: "space-between",
    overflow: "hidden",
    backgroundColor: colors.yellow,
  },

  bankCardFrozen: {
    opacity: 0.8,
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardBrand: {
    color: "#111111",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 0.8,
  },

  cardBalanceLabel: {
    color: "#3B3B3B",
    fontSize: 13,
    fontWeight: "600",
  },

  cardBalance: {
    color: "#111111",
    fontSize: 37,
    fontWeight: "900",
    marginTop: 3,
  },

  cardNumber: {
    color: "#222222",
    fontSize: 18,
    letterSpacing: 2,
  },

  cardBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardBottomText: {
    color: "#111111",
    fontSize: 12,
    fontWeight: "900",
  },

  frozenOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.68)",
  },

  frozenText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 8,
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 24,
  },

  action: {
    width: "31%",
    alignItems: "center",
  },

  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },

  actionLabel: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8,
  },

  pressed: {
    opacity: 0.7,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.border,
  },

  summaryLabel: {
    color: colors.muted,
    fontSize: 12,
  },

  summaryValue: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 5,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 27,
    marginBottom: 14,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
  },

  memberCount: {
    color: colors.muted,
    fontSize: 12,
  },

  membersRow: {
    gap: 12,
    paddingRight: 18,
  },

  memberCard: {
    width: 108,
    minHeight: 145,
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  avatar: {
    width: 49,
    height: 49,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292715",
  },

  avatarText: {
    color: colors.yellow,
    fontWeight: "900",
  },

  memberName: {
    color: colors.white,
    fontWeight: "800",
    marginTop: 9,
  },

  memberAmount: {
    color: colors.yellow,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 5,
  },

  youLabel: {
    color: colors.muted,
    fontSize: 10,
    marginTop: 4,
  },

  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 15,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: colors.border,
  },

  transactionIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292715",
  },

  transactionInformation: {
    flex: 1,
    marginLeft: 13,
  },

  transactionMerchant: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },

  transactionPerson: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },

  transactionAmount: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.75)",
  },

  modalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 22,
    paddingBottom: 34,
  },

  modalHandle: {
    width: 44,
    height: 5,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#555555",
    marginBottom: 21,
  },

  modalTitle: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "900",
  },

  modalSubtitle: {
    color: "#AFAFAF",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
  },

  modalBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#252525",
    borderRadius: 14,
    padding: 15,
    marginTop: 20,
  },

  modalBalanceLabel: {
    color: colors.muted,
  },

  modalBalanceValue: {
    color: colors.yellow,
    fontWeight: "900",
  },

  inputLabel: {
    color: "#D0D0D0",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 7,
  },

  input: {
    height: 54,
    borderRadius: 14,
    paddingHorizontal: 16,
    color: colors.white,
    fontSize: 17,
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },

  confirmButton: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    marginTop: 22,
  },

  confirmButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
  },

  cancelButton: {
    alignItems: "center",
    paddingTop: 17,
  },

  cancelText: {
    color: "#CFCFCF",
    fontWeight: "700",
  },
});
