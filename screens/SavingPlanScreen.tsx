
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

type SavingPlan = {
  id: string;
  name: string;
  target: number;
  saved: number;
  icon: keyof typeof Ionicons.glyphMap;
};

type ModalMode = "create" | "deposit" | null;

const initialPlans: SavingPlan[] = [
  {
    id: "laptop",
    name: "New Laptop",
    target: 2000,
    saved: 850,
    icon: "laptop-outline",
  },
  {
    id: "holiday",
    name: "Summer Holiday",
    target: 1200,
    saved: 440,
    icon: "airplane-outline",
  },
];

function parseMoney(value: string) {
  return Number(value.replace(",", "."));
}

export default function SavingPlanScreen() {
  const [availableBalance, setAvailableBalance] =
    useState(3250);

  const [plans, setPlans] =
    useState<SavingPlan[]>(initialPlans);

  const [modalMode, setModalMode] =
    useState<ModalMode>(null);

  const [selectedPlan, setSelectedPlan] =
    useState<SavingPlan | null>(null);

  const [amount, setAmount] = useState("");
  const [planName, setPlanName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const totalSaved = useMemo(() => {
    return plans.reduce(
      (total, plan) => total + plan.saved,
      0
    );
  }, [plans]);

  const closeModal = () => {
    setModalMode(null);
    setSelectedPlan(null);
    setAmount("");
    setPlanName("");
    setTargetAmount("");
  };

  const openDepositModal = (plan: SavingPlan) => {
    setSelectedPlan(plan);
    setAmount("");
    setModalMode("deposit");
  };

  const depositMoney = () => {
    if (!selectedPlan) {
      return;
    }

    const requestedAmount = parseMoney(amount);

    if (
      Number.isNaN(requestedAmount) ||
      requestedAmount <= 0
    ) {
      Alert.alert(
        "Invalid amount",
        "Enter an amount greater than zero."
      );

      return;
    }

    if (requestedAmount > availableBalance) {
      Alert.alert(
        "Insufficient balance",
        "You do not have enough money in your available balance."
      );

      return;
    }

    const remainingGoal =
      selectedPlan.target - selectedPlan.saved;

    if (remainingGoal <= 0) {
      Alert.alert(
        "Goal completed",
        "This saving plan has already reached its goal."
      );

      return;
    }

    const transferredAmount = Math.min(
      requestedAmount,
      remainingGoal
    );

    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === selectedPlan.id
          ? {
              ...plan,
              saved: plan.saved + transferredAmount,
            }
          : plan
      )
    );

    setAvailableBalance(
      (currentBalance) =>
        currentBalance - transferredAmount
    );

    closeModal();
  };

  const createPlan = () => {
    const target = parseMoney(targetAmount);

    if (!planName.trim()) {
      Alert.alert(
        "Plan name required",
        "Enter a name for your saving plan."
      );

      return;
    }

    if (Number.isNaN(target) || target <= 0) {
      Alert.alert(
        "Invalid target",
        "Enter a valid target amount."
      );

      return;
    }

    const newPlan: SavingPlan = {
      id: `${Date.now()}`,
      name: planName.trim(),
      target,
      saved: 0,
      icon: "flag-outline",
    };

    setPlans((currentPlans) => [
      newPlan,
      ...currentPlans,
    ]);

    closeModal();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.balanceCard}>
          <View style={styles.balanceTopRow}>
            <View>
              <Text style={styles.balanceLabel}>
                Available Balance
              </Text>

              <Text style={styles.balanceAmount}>
                €{availableBalance.toFixed(2)}
              </Text>
            </View>

            <View style={styles.walletIcon}>
              <Ionicons
                name="wallet"
                size={29}
                color="#111111"
              />
            </View>
          </View>

          <Text style={styles.balanceDescription}>
            Transfer money from your current balance
            into one of your personal saving goals.
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              Total Saved
            </Text>

            <Text style={styles.summaryValue}>
              €{totalSaved.toFixed(0)}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>
              Active Plans
            </Text>

            <Text style={styles.summaryValue}>
              {plans.length}
            </Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <View style={styles.titleInformation}>
            <Text style={styles.sectionTitle}>
              Your Saving Goals
            </Text>

            <Text style={styles.sectionSubtitle}>
              Build your future one transfer at a time
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.newPlanButton,
              pressed && styles.pressed,
            ]}
            onPress={() => setModalMode("create")}
          >
            <Ionicons
              name="add"
              size={21}
              color="#111111"
            />

            <Text style={styles.newPlanButtonText}>
              New
            </Text>
          </Pressable>
        </View>

        {plans.map((plan) => {
          const percentage = Math.min(
            Math.round(
              (plan.saved / plan.target) * 100
            ),
            100
          );

          const completed = percentage >= 100;

          return (
            <View
              key={plan.id}
              style={styles.planCard}
            >
              <View style={styles.planHeader}>
                <View style={styles.planIcon}>
                  <Ionicons
                    name={
                      completed
                        ? "checkmark-circle"
                        : plan.icon
                    }
                    size={27}
                    color={colors.yellow}
                  />
                </View>

                <View style={styles.planHeaderText}>
                  <Text style={styles.planTitle}>
                    {plan.name}
                  </Text>

                  <Text style={styles.planStatus}>
                    {completed
                      ? "Goal completed"
                      : `${percentage}% completed`}
                  </Text>
                </View>

                <Text style={styles.planPercent}>
                  {percentage}%
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                    },
                  ]}
                />
              </View>

              <View style={styles.amountRow}>
                <View>
                  <Text style={styles.amountLabel}>
                    Saved
                  </Text>

                  <Text style={styles.savedAmount}>
                    €{plan.saved.toFixed(0)}
                  </Text>
                </View>

                <View style={styles.targetInformation}>
                  <Text style={styles.amountLabel}>
                    Target
                  </Text>

                  <Text style={styles.targetAmount}>
                    €{plan.target.toFixed(0)}
                  </Text>
                </View>
              </View>

              <Pressable
                disabled={completed}
                style={({ pressed }) => [
                  styles.depositButton,
                  completed &&
                    styles.depositButtonDisabled,
                  pressed &&
                    !completed &&
                    styles.pressed,
                ]}
                onPress={() =>
                  openDepositModal(plan)
                }
              >
                <Ionicons
                  name={
                    completed
                      ? "checkmark-circle-outline"
                      : "add-circle-outline"
                  }
                  size={21}
                  color={
                    completed
                      ? colors.muted
                      : "#111111"
                  }
                />

                <Text
                  style={[
                    styles.depositButtonText,
                    completed &&
                      styles.depositButtonTextDisabled,
                  ]}
                >
                  {completed
                    ? "Goal Reached"
                    : "Add Money"}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>

      <Modal
        transparent
        animationType="slide"
        visible={modalMode !== null}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHandle} />

            {modalMode === "create" ? (
              <>
                <Text style={styles.modalTitle}>
                  Create Saving Plan
                </Text>

                <Text style={styles.modalSubtitle}>
                  Choose what you want to save for
                  and set your target amount.
                </Text>

                <Text style={styles.inputLabel}>
                  Plan Name
                </Text>

                <TextInput
                  value={planName}
                  onChangeText={setPlanName}
                  style={styles.input}
                  placeholder="Example: First Car"
                  placeholderTextColor="#777777"
                  maxLength={35}
                />

                <Text style={styles.inputLabel}>
                  Target Amount
                </Text>

                <TextInput
                  value={targetAmount}
                  onChangeText={setTargetAmount}
                  style={styles.input}
                  placeholder="2000"
                  placeholderTextColor="#777777"
                  keyboardType="decimal-pad"
                />

                <Pressable
                  style={({ pressed }) => [
                    styles.modalPrimaryButton,
                    pressed && styles.pressed,
                  ]}
                  onPress={createPlan}
                >
                  <Text
                    style={
                      styles.modalPrimaryButtonText
                    }
                  >
                    Create Plan
                  </Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>
                  Add Money
                </Text>

                <Text style={styles.modalSubtitle}>
                  Transfer money to{" "}
                  {selectedPlan?.name ??
                    "your saving plan"}.
                </Text>

                <View style={styles.modalBalanceRow}>
                  <Text
                    style={styles.modalBalanceLabel}
                  >
                    Available
                  </Text>

                  <Text
                    style={styles.modalBalanceValue}
                  >
                    €{availableBalance.toFixed(2)}
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
                    styles.modalPrimaryButton,
                    pressed && styles.pressed,
                  ]}
                  onPress={depositMoney}
                >
                  <Text
                    style={
                      styles.modalPrimaryButtonText
                    }
                  >
                    Confirm Transfer
                  </Text>
                </Pressable>
              </>
            )}

            <Pressable
              style={styles.cancelButton}
              onPress={closeModal}
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

  balanceCard: {
    backgroundColor: colors.yellow,
    borderRadius: radius.lg,
    padding: 22,
  },

  balanceTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  balanceLabel: {
    color: "#343434",
    fontSize: 14,
    fontWeight: "700",
  },

  balanceAmount: {
    color: "#111111",
    fontSize: 36,
    fontWeight: "900",
    marginTop: 4,
  },

  walletIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.11)",
  },

  balanceDescription: {
    color: "#373737",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 14,
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
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
    marginTop: 6,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 28,
    marginBottom: 15,
  },

  titleInformation: {
    flex: 1,
    marginRight: 12,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "900",
  },

  sectionSubtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },

  newPlanButton: {
    minWidth: 78,
    height: 42,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    gap: 4,
  },

  newPlanButtonText: {
    color: "#111111",
    fontWeight: "900",
  },

  planCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },

  planHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  planIcon: {
    width: 51,
    height: 51,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292715",
  },

  planHeaderText: {
    flex: 1,
    marginLeft: 13,
  },

  planTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "900",
  },

  planStatus: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
  },

  planPercent: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: "900",
  },

  progressTrack: {
    height: 11,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#333333",
    marginTop: 20,
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
    backgroundColor: colors.yellow,
  },

  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  amountLabel: {
    color: colors.muted,
    fontSize: 11,
  },

  savedAmount: {
    color: colors.white,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 3,
  },

  targetInformation: {
    alignItems: "flex-end",
  },

  targetAmount: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 3,
  },

  depositButton: {
    height: 49,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    marginTop: 18,
    gap: 7,
  },

  depositButtonDisabled: {
    backgroundColor: "#303030",
  },

  depositButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "900",
  },

  depositButtonTextDisabled: {
    color: colors.muted,
  },

  pressed: {
    opacity: 0.72,
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

  modalBalanceRow: {
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

  modalPrimaryButton: {
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    marginTop: 22,
  },

  modalPrimaryButtonText: {
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
