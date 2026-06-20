import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TripStatus = "saving" | "active";
type Screen = "home" | "trip";
type ModalType = "create" | "deposit" | "expense" | "invite" | null;

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
}

interface Transaction {
  id: string;
  type: "deposit" | "expense";
  title: string;
  amount: number;
  time: string;
}

interface Trip {
  id: string;
  name: string;
  destination: string;
  travelDate: string;
  goal: number;
  saved: number;
  status: TripStatus;
  members: string[];
  messages: Message[];
  transactions: Transaction[];
}

const initialTrips: Trip[] = [
  {
    id: "trip-1",
    name: "Summer in Barcelona",
    destination: "Barcelona, Spain",
    travelDate: "15 August 2026",
    goal: 1800,
    saved: 720,
    status: "saving",
    members: ["You", "Aron", "Elira"],
    messages: [
      {
        id: "message-1",
        sender: "Aron",
        text: "I found some affordable apartments near the beach!",
        time: "10:24",
      },
      {
        id: "message-2",
        sender: "Elira",
        text: "Perfect. Let us reach the goal first 🔥",
        time: "10:27",
      },
    ],
    transactions: [
      {
        id: "transaction-1",
        type: "deposit",
        title: "Your contribution",
        amount: 400,
        time: "18 Jun",
      },
      {
        id: "transaction-2",
        type: "deposit",
        title: "Aron's contribution",
        amount: 200,
        time: "17 Jun",
      },
      {
        id: "transaction-3",
        type: "deposit",
        title: "Elira's contribution",
        amount: 120,
        time: "15 Jun",
      },
    ],
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [mainBalance, setMainBalance] = useState(2450);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(
    initialTrips[0].id
  );
  const [modal, setModal] = useState<ModalType>(null);

  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [goal, setGoal] = useState("");

  const [amount, setAmount] = useState("");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [memberName, setMemberName] = useState("");
  const [messageText, setMessageText] = useState("");

  const selectedTrip = useMemo(
    () => trips.find((trip) => trip.id === selectedTripId),
    [trips, selectedTripId]
  );

  const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  const currentTime = () =>
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const openTrip = (tripId: string) => {
    setSelectedTripId(tripId);
    setScreen("trip");
  };

  const resetCreateForm = () => {
    setTripName("");
    setDestination("");
    setTravelDate("");
    setGoal("");
  };

  const createTrip = () => {
    const numericGoal = Number(goal);

    if (
      !tripName.trim() ||
      !destination.trim() ||
      !travelDate.trim() ||
      !numericGoal ||
      numericGoal <= 0
    ) {
      Alert.alert("Missing information", "Complete all trip information.");
      return;
    }

    const newTrip: Trip = {
      id: Date.now().toString(),
      name: tripName.trim(),
      destination: destination.trim(),
      travelDate: travelDate.trim(),
      goal: numericGoal,
      saved: 0,
      status: "saving",
      members: ["You"],
      messages: [
        {
          id: `${Date.now()}-welcome`,
          sender: "TripBot",
          text: `Welcome to ${tripName.trim()}! Start saving and invite your friends.`,
          time: currentTime(),
        },
      ],
      transactions: [],
    };

    setTrips((currentTrips) => [newTrip, ...currentTrips]);
    setSelectedTripId(newTrip.id);
    resetCreateForm();
    setModal(null);
    setScreen("trip");
  };

  const addMoney = () => {
    if (!selectedTrip) return;

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      Alert.alert("Invalid amount", "Enter an amount greater than zero.");
      return;
    }

    if (numericAmount > mainBalance) {
      Alert.alert(
        "Insufficient balance",
        "Your main account does not have enough money."
      );
      return;
    }

    setMainBalance((balance) => balance - numericAmount);

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === selectedTrip.id
          ? {
              ...trip,
              saved: trip.saved + numericAmount,
              transactions: [
                {
                  id: Date.now().toString(),
                  type: "deposit",
                  title: "Your contribution",
                  amount: numericAmount,
                  time: "Today",
                },
                ...trip.transactions,
              ],
            }
          : trip
      )
    );

    setAmount("");
    setModal(null);
  };

  const startTrip = () => {
    if (!selectedTrip) return;

    if (selectedTrip.saved <= 0) {
      Alert.alert(
        "Trip wallet is empty",
        "Add money before starting the trip."
      );
      return;
    }

    Alert.alert(
      "Start shared wallet?",
      "All trip members will be able to see expenses made from this wallet.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Start trip",
          onPress: () => {
            setTrips((currentTrips) =>
              currentTrips.map((trip) =>
                trip.id === selectedTrip.id
                  ? { ...trip, status: "active" }
                  : trip
              )
            );
          },
        },
      ]
    );
  };

  const addExpense = () => {
    if (!selectedTrip) return;

    const numericAmount = Number(amount);

    if (!expenseTitle.trim() || !numericAmount || numericAmount <= 0) {
      Alert.alert("Missing information", "Add an expense name and amount.");
      return;
    }

    if (numericAmount > selectedTrip.saved) {
      Alert.alert(
        "Not enough trip money",
        "This expense is higher than the trip balance."
      );
      return;
    }

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === selectedTrip.id
          ? {
              ...trip,
              saved: trip.saved - numericAmount,
              transactions: [
                {
                  id: Date.now().toString(),
                  type: "expense",
                  title: expenseTitle.trim(),
                  amount: numericAmount,
                  time: "Today",
                },
                ...trip.transactions,
              ],
              messages: [
                ...trip.messages,
                {
                  id: `${Date.now()}-expense`,
                  sender: "TripBot",
                  text: `€${formatMoney(
                    numericAmount
                  )} was spent on ${expenseTitle.trim()}.`,
                  time: currentTime(),
                },
              ],
            }
          : trip
      )
    );

    setAmount("");
    setExpenseTitle("");
    setModal(null);
  };

  const inviteMember = () => {
    if (!selectedTrip || !memberName.trim()) {
      Alert.alert("Enter a name", "Write the name of the person to invite.");
      return;
    }

    const newMember = memberName.trim();

    if (
      selectedTrip.members.some(
        (member) => member.toLowerCase() === newMember.toLowerCase()
      )
    ) {
      Alert.alert("Already added", "This person is already in the trip.");
      return;
    }

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === selectedTrip.id
          ? {
              ...trip,
              members: [...trip.members, newMember],
              messages: [
                ...trip.messages,
                {
                  id: `${Date.now()}-member`,
                  sender: "TripBot",
                  text: `${newMember} joined the trip.`,
                  time: currentTime(),
                },
              ],
            }
          : trip
      )
    );

    setMemberName("");
    setModal(null);
  };

  const sendMessage = () => {
    if (!selectedTrip || !messageText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: messageText.trim(),
      time: currentTime(),
    };

    setTrips((currentTrips) =>
      currentTrips.map((trip) =>
        trip.id === selectedTrip.id
          ? { ...trip, messages: [...trip.messages, newMessage] }
          : trip
      )
    );

    setMessageText("");
  };

  const renderHome = () => (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.pageContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.smallMuted}>GOOD AFTERNOON</Text>
          <Text style={styles.headerTitle}>Hi, Gerti 👋</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>GR</Text>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <View style={styles.balanceTopRow}>
          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.cardLogo}>RY</Text>
        </View>

        <Text style={styles.balanceAmount}>
          €{formatMoney(mainBalance)}
        </Text>

        <View style={styles.cardBottomRow}>
          <Text style={styles.cardNumber}>•••• 2406</Text>
          <View style={styles.activePill}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickAction}
          onPress={() => setModal("create")}
        >
          <View style={styles.quickIcon}>
            <Text style={styles.quickIconText}>＋</Text>
          </View>
          <Text style={styles.quickActionText}>New trip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction}>
          <View style={styles.quickIcon}>
            <Text style={styles.quickIconText}>↗</Text>
          </View>
          <Text style={styles.quickActionText}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickAction}>
          <View style={styles.quickIcon}>
            <Text style={styles.quickIconText}>◎</Text>
          </View>
          <Text style={styles.quickActionText}>Rewards</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Your trips</Text>
          <Text style={styles.sectionSubtitle}>
            Save together. Travel together.
          </Text>
        </View>

        <TouchableOpacity onPress={() => setModal("create")}>
          <Text style={styles.seeAll}>Create</Text>
        </TouchableOpacity>
      </View>

      {trips.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>✈️</Text>
          <Text style={styles.emptyTitle}>Create your first adventure</Text>
          <Text style={styles.emptyDescription}>
            Set a goal, invite friends and save together.
          </Text>
        </View>
      ) : (
        trips.map((trip) => {
          const progress = Math.min((trip.saved / trip.goal) * 100, 100);

          return (
            <TouchableOpacity
              key={trip.id}
              style={styles.tripCard}
              activeOpacity={0.85}
              onPress={() => openTrip(trip.id)}
            >
              <View style={styles.tripImagePlaceholder}>
                <Text style={styles.tripEmoji}>
                  {trip.status === "active" ? "🌍" : "✈️"}
                </Text>

                <View
                  style={[
                    styles.statusBadge,
                    trip.status === "active" && styles.activeStatusBadge,
                  ]}
                >
                  <Text style={styles.statusBadgeText}>
                    {trip.status === "active" ? "TRIP ACTIVE" : "SAVING"}
                  </Text>
                </View>
              </View>

              <View style={styles.tripCardContent}>
                <Text style={styles.tripName}>{trip.name}</Text>
                <Text style={styles.tripDestination}>
                  {trip.destination} · {trip.travelDate}
                </Text>

                <View style={styles.amountRow}>
                  <Text style={styles.tripSaved}>
                    €{formatMoney(trip.saved)}
                  </Text>
                  <Text style={styles.tripGoal}>
                    of €{formatMoney(trip.goal)}
                  </Text>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progress}%` },
                    ]}
                  />
                </View>

                <View style={styles.tripFooter}>
                  <View style={styles.memberAvatars}>
                    {trip.members.slice(0, 3).map((member, index) => (
                      <View
                        key={`${member}-${index}`}
                        style={[
                          styles.miniAvatar,
                          { marginLeft: index === 0 ? 0 : -8 },
                        ]}
                      >
                        <Text style={styles.miniAvatarText}>
                          {member.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <Text style={styles.progressText}>
                    {progress.toFixed(0)}% complete
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );

  const renderTrip = () => {
    if (!selectedTrip) return null;

    const progress = Math.min(
      (selectedTrip.saved / selectedTrip.goal) * 100,
      100
    );

    return (
      <KeyboardAvoidingView
        style={styles.page}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.pageContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.tripHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setScreen("home")}
            >
              <Text style={styles.backButtonText}>‹</Text>
            </TouchableOpacity>

            <View style={styles.tripHeaderCenter}>
              <Text style={styles.tripHeaderTitle}>{selectedTrip.name}</Text>
              <Text style={styles.tripHeaderSubtitle}>
                {selectedTrip.destination}
              </Text>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreButtonText}>•••</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tripWalletCard}>
            <View style={styles.walletHeader}>
              <View>
                <Text style={styles.walletLabel}>TRIP WALLET</Text>
                <Text style={styles.walletBalance}>
                  €{formatMoney(selectedTrip.saved)}
                </Text>
              </View>

              <View
                style={[
                  styles.walletStatus,
                  selectedTrip.status === "active" &&
                    styles.walletStatusActive,
                ]}
              >
                <Text style={styles.walletStatusText}>
                  {selectedTrip.status === "active" ? "ACTIVE" : "SAVING"}
                </Text>
              </View>
            </View>

            <View style={styles.walletProgressLabels}>
              <Text style={styles.walletProgressText}>
                {progress.toFixed(0)}% saved
              </Text>
              <Text style={styles.walletGoalText}>
                Goal €{formatMoney(selectedTrip.goal)}
              </Text>
            </View>

            <View style={styles.walletProgressBackground}>
              <View
                style={[
                  styles.walletProgressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>

            <Text style={styles.travelDate}>
              ✈ Departure: {selectedTrip.travelDate}
            </Text>
          </View>

          <View style={styles.tripActionRow}>
            <TouchableOpacity
              style={styles.primaryAction}
              onPress={() => setModal("deposit")}
            >
              <Text style={styles.primaryActionIcon}>＋</Text>
              <Text style={styles.primaryActionText}>Add money</Text>
            </TouchableOpacity>

            {selectedTrip.status === "saving" ? (
              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={startTrip}
              >
                <Text style={styles.secondaryActionIcon}>▶</Text>
                <Text style={styles.secondaryActionText}>Start trip</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={() => setModal("expense")}
              >
                <Text style={styles.secondaryActionIcon}>−</Text>
                <Text style={styles.secondaryActionText}>Add expense</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Trip members</Text>
              <Text style={styles.sectionSubtitle}>
                {selectedTrip.members.length} people in this trip
              </Text>
            </View>

            <TouchableOpacity onPress={() => setModal("invite")}>
              <Text style={styles.seeAll}>+ Invite</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.membersList}
          >
            {selectedTrip.members.map((member) => (
              <View key={member} style={styles.memberItem}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberAvatarText}>
                    {member.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.memberName}>{member}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.chatCard}>
            <View style={styles.chatHeader}>
              <View>
                <Text style={styles.chatTitle}>Trip chat</Text>
                <Text style={styles.chatSubtitle}>
                  Plan and decide together
                </Text>
              </View>

              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online</Text>
              </View>
            </View>

            <View style={styles.messagesContainer}>
              {selectedTrip.messages.slice(-5).map((message) => {
                const isCurrentUser = message.sender === "You";

                return (
                  <View
                    key={message.id}
                    style={[
                      styles.messageRow,
                      isCurrentUser && styles.currentUserMessageRow,
                    ]}
                  >
                    {!isCurrentUser && (
                      <View style={styles.messageAvatar}>
                        <Text style={styles.messageAvatarText}>
                          {message.sender.charAt(0)}
                        </Text>
                      </View>
                    )}

                    <View
                      style={[
                        styles.messageBubble,
                        isCurrentUser && styles.currentUserMessageBubble,
                      ]}
                    >
                      {!isCurrentUser && (
                        <Text style={styles.messageSender}>
                          {message.sender}
                        </Text>
                      )}
                      <Text
                        style={[
                          styles.messageText,
                          isCurrentUser && styles.currentUserMessageText,
                        ]}
                      >
                        {message.text}
                      </Text>
                      <Text
                        style={[
                          styles.messageTime,
                          isCurrentUser && styles.currentUserMessageTime,
                        ]}
                      >
                        {message.time}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>

            <View style={styles.messageInputRow}>
              <TextInput
                style={styles.messageInput}
                placeholder="Write a message..."
                placeholderTextColor="#89909F"
                value={messageText}
                onChangeText={setMessageText}
                onSubmitEditing={sendMessage}
              />

              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendMessage}
              >
                <Text style={styles.sendButtonText}>➤</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Trip activity</Text>
              <Text style={styles.sectionSubtitle}>
                Contributions and shared expenses
              </Text>
            </View>
          </View>

          <View style={styles.transactionCard}>
            {selectedTrip.transactions.length === 0 ? (
              <View style={styles.noTransactions}>
                <Text style={styles.noTransactionsText}>
                  No transactions yet
                </Text>
              </View>
            ) : (
              selectedTrip.transactions.map((transaction, index) => (
                <View
                  key={transaction.id}
                  style={[
                    styles.transactionRow,
                    index !== selectedTrip.transactions.length - 1 &&
                      styles.transactionBorder,
                  ]}
                >
                  <View
                    style={[
                      styles.transactionIcon,
                      transaction.type === "expense" &&
                        styles.expenseTransactionIcon,
                    ]}
                  >
                    <Text style={styles.transactionIconText}>
                      {transaction.type === "deposit" ? "↓" : "↑"}
                    </Text>
                  </View>

                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>
                      {transaction.title}
                    </Text>
                    <Text style={styles.transactionDate}>
                      {transaction.time}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.type === "expense" &&
                        styles.expenseAmount,
                    ]}
                  >
                    {transaction.type === "deposit" ? "+" : "-"}€
                    {formatMoney(transaction.amount)}
                  </Text>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {screen === "home" ? renderHome() : renderTrip()}

      <Modal
        transparent
        animationType="slide"
        visible={modal !== null}
        onRequestClose={() => setModal(null)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={() => setModal(null)}
          />

          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />

            {modal === "create" && (
              <>
                <Text style={styles.modalTitle}>Create a new trip</Text>
                <Text style={styles.modalDescription}>
                  Set your destination and start saving together.
                </Text>

                <Text style={styles.inputLabel}>Trip name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Example: Summer in Ibiza"
                  placeholderTextColor="#989EAA"
                  value={tripName}
                  onChangeText={setTripName}
                />

                <Text style={styles.inputLabel}>Destination</Text>
                <TextInput
                  style={styles.input}
                  placeholder="City, Country"
                  placeholderTextColor="#989EAA"
                  value={destination}
                  onChangeText={setDestination}
                />

                <Text style={styles.inputLabel}>Travel date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="15 August 2026"
                  placeholderTextColor="#989EAA"
                  value={travelDate}
                  onChangeText={setTravelDate}
                />

                <Text style={styles.inputLabel}>Savings goal</Text>
                <TextInput
                  style={styles.input}
                  placeholder="€ 1,500"
                  placeholderTextColor="#989EAA"
                  keyboardType="decimal-pad"
                  value={goal}
                  onChangeText={setGoal}
                />

                <TouchableOpacity
                  style={styles.modalMainButton}
                  onPress={createTrip}
                >
                  <Text style={styles.modalMainButtonText}>Create trip</Text>
                </TouchableOpacity>
              </>
            )}

            {modal === "deposit" && (
              <>
                <Text style={styles.modalTitle}>Add money</Text>
                <Text style={styles.modalDescription}>
                  Transfer money from your main account to the trip wallet.
                </Text>

                <View style={styles.availableBalanceBox}>
                  <Text style={styles.availableBalanceLabel}>
                    Available in main account
                  </Text>
                  <Text style={styles.availableBalanceAmount}>
                    €{formatMoney(mainBalance)}
                  </Text>
                </View>

                <Text style={styles.inputLabel}>Amount</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="€ 0.00"
                  placeholderTextColor="#989EAA"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                  autoFocus
                />

                <View style={styles.suggestedAmounts}>
                  {[25, 50, 100, 200].map((value) => (
                    <TouchableOpacity
                      key={value}
                      style={styles.suggestedAmount}
                      onPress={() => setAmount(value.toString())}
                    >
                      <Text style={styles.suggestedAmountText}>€{value}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity
                  style={styles.modalMainButton}
                  onPress={addMoney}
                >
                  <Text style={styles.modalMainButtonText}>
                    Confirm transfer
                  </Text>
                </TouchableOpacity>
              </>
            )}

            {modal === "expense" && (
              <>
                <Text style={styles.modalTitle}>Add shared expense</Text>
                <Text style={styles.modalDescription}>
                  Every member will see this expense in the trip activity.
                </Text>

                <Text style={styles.inputLabel}>Expense name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Hotel, dinner, taxi..."
                  placeholderTextColor="#989EAA"
                  value={expenseTitle}
                  onChangeText={setExpenseTitle}
                />

                <Text style={styles.inputLabel}>Amount</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="€ 0.00"
                  placeholderTextColor="#989EAA"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                />

                <TouchableOpacity
                  style={styles.modalMainButton}
                  onPress={addExpense}
                >
                  <Text style={styles.modalMainButtonText}>Pay expense</Text>
                </TouchableOpacity>
              </>
            )}

            {modal === "invite" && (
              <>
                <Text style={styles.modalTitle}>Invite a friend</Text>
                <Text style={styles.modalDescription}>
                  Add friends to save, chat and manage the trip together.
                </Text>

                <Text style={styles.inputLabel}>Friend's name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter their name"
                  placeholderTextColor="#989EAA"
                  value={memberName}
                  onChangeText={setMemberName}
                  autoFocus
                />

                <TouchableOpacity
                  style={styles.modalMainButton}
                  onPress={inviteMember}
                >
                  <Text style={styles.modalMainButtonText}>Send invitation</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModal(null)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  page: {
    flex: 1,
  },
  pageContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  smallMuted: {
    color: "#8A909E",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  headerTitle: {
    color: "#171A23",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5FF48",
  },
  avatarText: {
    color: "#14171F",
    fontSize: 15,
    fontWeight: "800",
  },
  balanceCard: {
    backgroundColor: "#151821",
    borderRadius: 26,
    padding: 22,
    minHeight: 190,
    justifyContent: "space-between",
  },
  balanceTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceLabel: {
    color: "#B8BBC5",
    fontSize: 14,
  },
  cardLogo: {
    color: "#151821",
    backgroundColor: "#E5FF48",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    fontWeight: "900",
  },
  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "800",
    marginVertical: 20,
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardNumber: {
    color: "#D3D5DB",
    fontSize: 14,
    letterSpacing: 2,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#292D37",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#E5FF48",
    marginRight: 6,
  },
  activeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 30,
  },
  quickAction: {
    alignItems: "center",
    width: "31%",
  },
  quickIcon: {
    width: 58,
    height: 58,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },
  quickIconText: {
    color: "#171A23",
    fontSize: 24,
    fontWeight: "500",
  },
  quickActionText: {
    color: "#343843",
    fontSize: 13,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 15,
  },
  sectionTitle: {
    color: "#171A23",
    fontSize: 21,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#8A909E",
    fontSize: 13,
    marginTop: 3,
  },
  seeAll: {
    color: "#6654E8",
    fontSize: 14,
    fontWeight: "700",
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 30,
    alignItems: "center",
  },
  emptyEmoji: {
    fontSize: 44,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#171A23",
    marginTop: 12,
  },
  emptyDescription: {
    color: "#8A909E",
    textAlign: "center",
    marginTop: 6,
  },
  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 18,
  },
  tripImagePlaceholder: {
    height: 130,
    backgroundColor: "#6857E8",
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tripEmoji: {
    fontSize: 52,
    alignSelf: "center",
    marginLeft: 18,
  },
  statusBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(20, 22, 30, 0.75)",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },
  activeStatusBadge: {
    backgroundColor: "#1C9A64",
  },
  statusBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  tripCardContent: {
    padding: 18,
  },
  tripName: {
    color: "#171A23",
    fontSize: 19,
    fontWeight: "800",
  },
  tripDestination: {
    color: "#8A909E",
    fontSize: 13,
    marginTop: 4,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 17,
    marginBottom: 9,
  },
  tripSaved: {
    color: "#171A23",
    fontSize: 20,
    fontWeight: "800",
  },
  tripGoal: {
    color: "#8A909E",
    fontSize: 12,
    marginLeft: 5,
  },
  progressBackground: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#EAECF1",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#6857E8",
  },
  tripFooter: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  memberAvatars: {
    flexDirection: "row",
  },
  miniAvatar: {
    width: 29,
    height: 29,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5FF48",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  miniAvatarText: {
    color: "#171A23",
    fontSize: 11,
    fontWeight: "800",
  },
  progressText: {
    color: "#6857E8",
    fontSize: 12,
    fontWeight: "700",
  },
  tripHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  backButtonText: {
    color: "#171A23",
    fontSize: 32,
    lineHeight: 34,
  },
  tripHeaderCenter: {
    flex: 1,
    alignItems: "center",
  },
  tripHeaderTitle: {
    color: "#171A23",
    fontSize: 17,
    fontWeight: "800",
  },
  tripHeaderSubtitle: {
    color: "#8A909E",
    fontSize: 12,
    marginTop: 2,
  },
  moreButton: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  moreButtonText: {
    color: "#171A23",
    fontSize: 15,
    fontWeight: "800",
  },
  tripWalletCard: {
    backgroundColor: "#6857E8",
    borderRadius: 26,
    padding: 22,
  },
  walletHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  walletLabel: {
    color: "#D8D3FF",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  walletBalance: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    marginTop: 5,
  },
  walletStatus: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(20, 20, 30, 0.35)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  walletStatusActive: {
    backgroundColor: "#1C9A64",
  },
  walletStatusText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  walletProgressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 8,
  },
  walletProgressText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  walletGoalText: {
    color: "#D8D3FF",
    fontSize: 12,
  },
  walletProgressBackground: {
    height: 9,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.24)",
    overflow: "hidden",
  },
  walletProgressFill: {
    height: "100%",
    backgroundColor: "#E5FF48",
    borderRadius: 10,
  },
  travelDate: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 19,
  },
  tripActionRow: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 20,
  },
  primaryAction: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#151821",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryActionIcon: {
    color: "#E5FF48",
    fontSize: 21,
    marginRight: 7,
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  secondaryAction: {
    flex: 1,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryActionIcon: {
    color: "#6857E8",
    fontSize: 18,
    marginRight: 7,
  },
  secondaryActionText: {
    color: "#171A23",
    fontSize: 14,
    fontWeight: "700",
  },
  membersList: {
    paddingBottom: 18,
  },
  memberItem: {
    alignItems: "center",
    marginRight: 18,
  },
  memberAvatar: {
    width: 52,
    height: 52,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5FF48",
  },
  memberAvatarText: {
    color: "#171A23",
    fontSize: 17,
    fontWeight: "800",
  },
  memberName: {
    color: "#424650",
    fontSize: 12,
    marginTop: 6,
  },
  chatCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 24,
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF0F4",
  },
  chatTitle: {
    color: "#171A23",
    fontSize: 17,
    fontWeight: "800",
  },
  chatSubtitle: {
    color: "#8A909E",
    fontSize: 12,
    marginTop: 2,
  },
  onlineBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#29B873",
    marginRight: 5,
  },
  onlineText: {
    color: "#29A66A",
    fontSize: 11,
    fontWeight: "700",
  },
  messagesContainer: {
    paddingVertical: 15,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  currentUserMessageRow: {
    justifyContent: "flex-end",
  },
  messageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 12,
    backgroundColor: "#E5FF48",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  messageAvatarText: {
    color: "#171A23",
    fontWeight: "800",
    fontSize: 11,
  },
  messageBubble: {
    maxWidth: "78%",
    backgroundColor: "#F0F1F5",
    borderRadius: 17,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  currentUserMessageBubble: {
    backgroundColor: "#6857E8",
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 5,
  },
  messageSender: {
    color: "#6857E8",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 3,
  },
  messageText: {
    color: "#282C35",
    fontSize: 13,
    lineHeight: 18,
  },
  currentUserMessageText: {
    color: "#FFFFFF",
  },
  messageTime: {
    color: "#989EAA",
    fontSize: 9,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  currentUserMessageTime: {
    color: "#D6D0FF",
  },
  messageInputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageInput: {
    flex: 1,
    height: 48,
    backgroundColor: "#F3F4F7",
    borderRadius: 16,
    paddingHorizontal: 15,
    color: "#171A23",
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#151821",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  sendButtonText: {
    color: "#E5FF48",
    fontSize: 17,
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 23,
    paddingHorizontal: 17,
  },
  transactionRow: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "center",
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFF0F4",
  },
  transactionIcon: {
    width: 42,
    height: 42,
    borderRadius: 15,
    backgroundColor: "#E2F8ED",
    alignItems: "center",
    justifyContent: "center",
  },
  expenseTransactionIcon: {
    backgroundColor: "#FFE8E8",
  },
  transactionIconText: {
    color: "#171A23",
    fontSize: 18,
    fontWeight: "700",
  },
  transactionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  transactionTitle: {
    color: "#20232C",
    fontSize: 14,
    fontWeight: "700",
  },
  transactionDate: {
    color: "#989EAA",
    fontSize: 11,
    marginTop: 3,
  },
  transactionAmount: {
    color: "#1A9B62",
    fontSize: 14,
    fontWeight: "800",
  },
  expenseAmount: {
    color: "#E14F4F",
  },
  noTransactions: {
    padding: 25,
    alignItems: "center",
  },
  noTransactionsText: {
    color: "#8A909E",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(14, 16, 22, 0.55)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 35 : 22,
  },
  modalHandle: {
    width: 42,
    height: 5,
    borderRadius: 5,
    backgroundColor: "#D9DCE3",
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    color: "#171A23",
    fontSize: 24,
    fontWeight: "800",
  },
  modalDescription: {
    color: "#7F8592",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 5,
    marginBottom: 20,
  },
  inputLabel: {
    color: "#424650",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 7,
  },
  input: {
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F2F3F6",
    color: "#171A23",
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 15,
  },
  amountInput: {
    height: 68,
    borderRadius: 18,
    backgroundColor: "#F2F3F6",
    color: "#171A23",
    paddingHorizontal: 17,
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 14,
  },
  availableBalanceBox: {
    backgroundColor: "#F2F0FF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 18,
  },
  availableBalanceLabel: {
    color: "#77708F",
    fontSize: 11,
  },
  availableBalanceAmount: {
    color: "#6857E8",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 3,
  },
  suggestedAmounts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  suggestedAmount: {
    width: "23%",
    paddingVertical: 11,
    backgroundColor: "#F2F3F6",
    borderRadius: 13,
    alignItems: "center",
  },
  suggestedAmountText: {
    color: "#4D5260",
    fontSize: 12,
    fontWeight: "700",
  },
  modalMainButton: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#151821",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  modalMainButtonText: {
    color: "#E5FF48",
    fontSize: 15,
    fontWeight: "800",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    marginTop: 4,
  },
  cancelButtonText: {
    color: "#7F8592",
    fontSize: 14,
    fontWeight: "600",
  },
});