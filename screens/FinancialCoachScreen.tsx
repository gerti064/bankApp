import { useRef, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { colors, radius } from "../components/theme";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    text:
      "Hi Gerti. I reviewed your available balance, recent spending and saving goals. Ask me anything about your money.",
  },
];

const quickQuestions = [
  "Can I afford a €150 festival ticket?",
  "How can I reach my laptop goal faster?",
  "Where can I reduce spending?",
];

function createCoachResponse(question: string) {
  const normalizedQuestion =
    question.toLowerCase();

  if (
    normalizedQuestion.includes("festival") ||
    normalizedQuestion.includes("afford")
  ) {
    return (
      "You can afford the €150 ticket from your €3,250 available balance. " +
      "However, buying it now would delay your laptop goal by around two weeks. " +
      "A safer option is to save €50 this week and buy the ticket after your next income."
    );
  }

  if (
    normalizedQuestion.includes("laptop") ||
    normalizedQuestion.includes("goal")
  ) {
    return (
      "You need €650 more to reach your laptop goal. " +
      "Saving €82 each week would complete it in about eight weeks. " +
      "Reducing food delivery by €25 weekly would cover almost one-third of that amount."
    );
  }

  if (
    normalizedQuestion.includes("reduce") ||
    normalizedQuestion.includes("spending") ||
    normalizedQuestion.includes("food")
  ) {
    return (
      "Food and dining is your largest category at €247 this month. " +
      "Setting a €45 weekly dining limit could save you approximately €67 next month."
    );
  }

  if (
    normalizedQuestion.includes("save") ||
    normalizedQuestion.includes("saving")
  ) {
    return (
      "Based on your current balance and expenses, a realistic target is €70 per week. " +
      "I recommend sending €50 to your laptop goal and €20 to an emergency fund."
    );
  }

  if (
    normalizedQuestion.includes("balance")
  ) {
    return (
      "Your available balance is €3,250. After protecting €1,000 as an emergency reserve, " +
      "you would have €2,250 available for normal spending and planned goals."
    );
  }

  return (
    "Based on your current €3,250 balance, €850 laptop savings and €820 monthly spending, " +
    "I recommend protecting your emergency money first and keeping weekly spending below €190."
  );
}

export default function FinancialCoachScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const [messages, setMessages] =
    useState<ChatMessage[]>(initialMessages);

  const [input, setInput] = useState("");

  const sendMessage = (customText?: string) => {
    const question = (
      customText ?? input
    ).trim();

    if (!question) {
      return;
    }

    const time = Date.now();

    const userMessage: ChatMessage = {
      id: `${time}-user`,
      role: "user",
      text: question,
    };

    const assistantMessage: ChatMessage = {
      id: `${time}-assistant`,
      role: "assistant",
      text: createCoachResponse(question),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    setInput("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
      keyboardVerticalOffset={90}
    >
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({
            animated: true,
          })
        }
      >
        <View style={styles.coachHeader}>
          <View style={styles.coachAvatar}>
            <Ionicons
              name="sparkles"
              size={31}
              color="#111111"
            />
          </View>

          <View style={styles.coachInformation}>
            <Text style={styles.coachName}>
              Rai Coach
            </Text>

            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />

              <Text style={styles.onlineText}>
                Analyzing your finances
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.balanceLabel}>
              Available Balance
            </Text>

            <Text style={styles.balanceValue}>
              €3,250.00
            </Text>
          </View>

          <View style={styles.healthScore}>
            <Text style={styles.healthScoreValue}>
              78
            </Text>

            <Text style={styles.healthScoreLabel}>
              Money Score
            </Text>
          </View>
        </View>

        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <View style={styles.goalIcon}>
              <Ionicons
                name="laptop-outline"
                size={22}
                color={colors.yellow}
              />
            </View>

            <View style={styles.goalInformation}>
              <Text style={styles.goalName}>
                New Laptop
              </Text>

              <Text style={styles.goalAmount}>
                €850 of €1,500
              </Text>
            </View>

            <Text style={styles.goalPercentage}>
              57%
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Coach Insights
        </Text>

        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons
              name="restaurant-outline"
              size={22}
              color={colors.yellow}
            />
          </View>

          <View style={styles.insightInformation}>
            <Text style={styles.insightTitle}>
              Save €67 Next Month
            </Text>

            <Text style={styles.insightDescription}>
              Reduce food delivery from four orders per
              week to two.
            </Text>
          </View>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightIcon}>
            <Ionicons
              name="calendar-outline"
              size={22}
              color={colors.yellow}
            />
          </View>

          <View style={styles.insightInformation}>
            <Text style={styles.insightTitle}>
              Reach Your Goal in 8 Weeks
            </Text>

            <Text style={styles.insightDescription}>
              Transfer approximately €82 each week to
              your laptop plan.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Ask Your Financial Coach
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickQuestions}
        >
          {quickQuestions.map((question) => (
            <Pressable
              key={question}
              style={({ pressed }) => [
                styles.quickQuestion,
                pressed && styles.pressed,
              ]}
              onPress={() => sendMessage(question)}
            >
              <Text style={styles.quickQuestionText}>
                {question}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.chatContainer}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageRow,
                message.role === "user" &&
                  styles.userMessageRow,
              ]}
            >
              {message.role === "assistant" && (
                <View style={styles.messageAvatar}>
                  <Ionicons
                    name="sparkles"
                    size={17}
                    color="#111111"
                  />
                </View>
              )}

              <View
                style={[
                  styles.messageBubble,
                  message.role === "user"
                    ? styles.userBubble
                    : styles.assistantBubble,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    message.role === "user" &&
                      styles.userMessageText,
                  ]}
                >
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.chatInput}
          placeholder="Ask about your money..."
          placeholderTextColor="#777777"
          multiline
          maxLength={250}
        />

        <Pressable
          style={({ pressed }) => [
            styles.sendButton,
            pressed && styles.pressed,
          ]}
          onPress={() => sendMessage()}
        >
          <Ionicons
            name="arrow-up"
            size={23}
            color="#111111"
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  content: {
    padding: 18,
    paddingBottom: 24,
  },

  coachHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  coachAvatar: {
    width: 58,
    height: 58,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
  },

  coachInformation: {
    marginLeft: 13,
  },

  coachName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "900",
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4BD37B",
  },

  onlineText: {
    color: colors.muted,
    fontSize: 12,
    marginLeft: 6,
  },

  balanceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.yellow,
    borderRadius: radius.lg,
    padding: 21,
  },

  balanceLabel: {
    color: "#3B3B3B",
    fontSize: 13,
    fontWeight: "700",
  },

  balanceValue: {
    color: "#111111",
    fontSize: 32,
    fontWeight: "900",
    marginTop: 4,
  },

  healthScore: {
    width: 75,
    height: 75,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.12)",
  },

  healthScoreValue: {
    color: "#111111",
    fontSize: 24,
    fontWeight: "900",
  },

  healthScoreLabel: {
    color: "#333333",
    fontSize: 8,
    fontWeight: "700",
  },

  goalCard: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 17,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 13,
  },

  goalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  goalIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292715",
  },

  goalInformation: {
    flex: 1,
    marginLeft: 11,
  },

  goalName: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900",
  },

  goalAmount: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 4,
  },

  goalPercentage: {
    color: colors.yellow,
    fontSize: 18,
    fontWeight: "900",
  },

  progressTrack: {
    height: 9,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#343434",
    marginTop: 15,
  },

  progressFill: {
    width: "57%",
    height: "100%",
    backgroundColor: colors.yellow,
  },

  sectionTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 27,
    marginBottom: 13,
  },

  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: 15,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
  },

  insightIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#292715",
  },

  insightInformation: {
    flex: 1,
    marginLeft: 12,
  },

  insightTitle: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "900",
  },

  insightDescription: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },

  quickQuestions: {
    paddingRight: 18,
    gap: 9,
  },

  quickQuestion: {
    maxWidth: 210,
    backgroundColor: "#262626",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: colors.border,
  },

  quickQuestionText: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },

  chatContainer: {
    marginTop: 22,
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 13,
  },

  userMessageRow: {
    justifyContent: "flex-end",
  },

  messageAvatar: {
    width: 31,
    height: 31,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    marginRight: 8,
  },

  messageBubble: {
    maxWidth: "82%",
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  assistantBubble: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },

  userBubble: {
    backgroundColor: colors.yellow,
    borderBottomRightRadius: 5,
  },

  messageText: {
    color: colors.white,
    fontSize: 13,
    lineHeight: 20,
  },

  userMessageText: {
    color: "#111111",
    fontWeight: "700",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#171717",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom:
      Platform.OS === "ios" ? 22 : 12,
  },

  chatInput: {
    flex: 1,
    minHeight: 48,
    maxHeight: 105,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingTop: 13,
    paddingBottom: 11,
    color: colors.white,
    fontSize: 14,
    backgroundColor: "#252525",
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    marginLeft: 9,
  },

  pressed: {
    opacity: 0.7,
  },
});
