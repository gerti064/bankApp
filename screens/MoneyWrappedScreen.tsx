
import { useRef, useState } from "react";

import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { colors } from "../components/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;

type WrappedSlide = {
  id: string;
  eyebrow: string;
  title: string;
  value: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  background: string;
  textColor: string;
  secondaryColor: string;
};

const slides: WrappedSlide[] = [
  {
    id: "welcome",
    eyebrow: "JUNE 2026",
    title: "Your Monthly Money Wrapped",
    value: "Ready?",
    description:
      "Swipe through the story of how you spent, saved and improved this month.",
    icon: "sparkles",
    background: "#F4D83D",
    textColor: "#111111",
    secondaryColor: "#363636",
  },
  {
    id: "spent",
    eyebrow: "TOTAL SPENDING",
    title: "You used your money across 47 payments",
    value: "€820",
    description:
      "That is €64 less than last month. Your spending moved in the right direction.",
    icon: "card-outline",
    background: "#232323",
    textColor: "#FFFFFF",
    secondaryColor: "#BDBDBD",
  },
  {
    id: "category",
    eyebrow: "TOP CATEGORY",
    title: "Food and dining took first place",
    value: "€247",
    description:
      "You made 14 food-related payments. That represents 30% of your spending.",
    icon: "restaurant-outline",
    background: "#3A251C",
    textColor: "#FFFFFF",
    secondaryColor: "#D9C1B5",
  },
  {
    id: "saving",
    eyebrow: "MONEY SAVED",
    title: "Your future self says thank you",
    value: "€280",
    description:
      "You saved 18% more than last month and completed four saving transfers.",
    icon: "wallet-outline",
    background: "#17352A",
    textColor: "#FFFFFF",
    secondaryColor: "#B6D7C8",
  },
  {
    id: "goal",
    eyebrow: "TOP GOAL",
    title: "Your laptop goal is getting closer",
    value: "57%",
    description:
      "You have saved €850 of your €1,500 target. Keep your weekly transfers active.",
    icon: "laptop-outline",
    background: "#1B2D46",
    textColor: "#FFFFFF",
    secondaryColor: "#B8C7DC",
  },
  {
    id: "streak",
    eyebrow: "SMART STREAK",
    title: "You checked your finances consistently",
    value: "18 days",
    description:
      "This is your longest money-management streak so far.",
    icon: "flame-outline",
    background: "#48211E",
    textColor: "#FFFFFF",
    secondaryColor: "#E1BDB9",
  },
  {
    id: "personality",
    eyebrow: "YOUR MONEY PERSONALITY",
    title: "You are the",
    value: "Smart Explorer",
    description:
      "You enjoy experiences, but you are becoming more intentional about saving for them.",
    icon: "compass-outline",
    background: "#F4D83D",
    textColor: "#111111",
    secondaryColor: "#363636",
  },
];

export default function MoneyWrappedScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const goToSlide = (index: number) => {
    const safeIndex = Math.max(
      0,
      Math.min(index, slides.length - 1)
    );

    scrollRef.current?.scrollTo({
      x: safeIndex * SCREEN_WIDTH,
      animated: true,
    });

    setCurrentSlide(safeIndex);
  };

  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x /
        SCREEN_WIDTH
    );

    setCurrentSlide(index);
  };

  const isLastSlide =
    currentSlide === slides.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.topInformation}>
        <View>
          <Text style={styles.monthText}>
            June 2026
          </Text>

          <Text style={styles.title}>
            Money Wrapped
          </Text>
        </View>

        <Text style={styles.counter}>
          {currentSlide + 1}/{slides.length}
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={styles.slider}
      >
        {slides.map((slide) => (
          <View
            key={slide.id}
            style={styles.slideContainer}
          >
            <View
              style={[
                styles.slideCard,
                {
                  backgroundColor:
                    slide.background,
                },
              ]}
            >
              <View style={styles.slideTopRow}>
                <Text
                  style={[
                    styles.eyebrow,
                    {
                      color:
                        slide.secondaryColor,
                    },
                  ]}
                >
                  {slide.eyebrow}
                </Text>

                <View
                  style={[
                    styles.iconCircle,
                    {
                      backgroundColor:
                        slide.textColor ===
                        "#111111"
                          ? "rgba(0,0,0,0.12)"
                          : "rgba(255,255,255,0.12)",
                    },
                  ]}
                >
                  <Ionicons
                    name={slide.icon}
                    size={29}
                    color={slide.textColor}
                  />
                </View>
              </View>

              <View style={styles.slideMainContent}>
                <Text
                  style={[
                    styles.slideTitle,
                    {
                      color: slide.textColor,
                    },
                  ]}
                >
                  {slide.title}
                </Text>

                <Text
                  style={[
                    styles.slideValue,
                    {
                      color: slide.textColor,
                    },
                  ]}
                >
                  {slide.value}
                </Text>

                <Text
                  style={[
                    styles.slideDescription,
                    {
                      color:
                        slide.secondaryColor,
                    },
                  ]}
                >
                  {slide.description}
                </Text>
              </View>

              <View style={styles.decorations}>
                <View
                  style={[
                    styles.decorationLarge,
                    {
                      borderColor:
                        slide.textColor ===
                        "#111111"
                          ? "rgba(0,0,0,0.10)"
                          : "rgba(255,255,255,0.10)",
                    },
                  ]}
                />

                <View
                  style={[
                    styles.decorationSmall,
                    {
                      borderColor:
                        slide.textColor ===
                        "#111111"
                          ? "rgba(0,0,0,0.13)"
                          : "rgba(255,255,255,0.13)",
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomControls}>
        <View style={styles.indicators}>
          {slides.map((slide, index) => (
            <Pressable
              key={slide.id}
              onPress={() => goToSlide(index)}
              style={[
                styles.indicator,
                index === currentSlide &&
                  styles.indicatorActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonRow}>
          {currentSlide > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.previousButton,
                pressed && styles.pressed,
              ]}
              onPress={() =>
                goToSlide(currentSlide - 1)
              }
            >
              <Ionicons
                name="arrow-back"
                size={21}
                color={colors.white}
              />

              <Text style={styles.previousText}>
                Back
              </Text>
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.nextButton,
              currentSlide === 0 &&
                styles.nextButtonFull,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              isLastSlide
                ? goToSlide(0)
                : goToSlide(currentSlide + 1)
            }
          >
            <Text style={styles.nextText}>
              {isLastSlide
                ? "View Again"
                : "Next"}
            </Text>

            <Ionicons
              name={
                isLastSlide
                  ? "refresh"
                  : "arrow-forward"
              }
              size={21}
              color="#111111"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  topInformation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 12,
  },

  monthText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },

  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 3,
  },

  counter: {
    color: colors.yellow,
    fontWeight: "900",
  },

  slider: {
    flex: 1,
  },

  slideContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 18,
    paddingVertical: 7,
  },

  slideCard: {
    flex: 1,
    minHeight: 470,
    borderRadius: 30,
    padding: 25,
    overflow: "hidden",
  },

  slideTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
  },

  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  slideMainContent: {
    flex: 1,
    justifyContent: "center",
    zIndex: 2,
  },

  slideTitle: {
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 33,
    maxWidth: "90%",
  },

  slideValue: {
    fontSize: 47,
    fontWeight: "900",
    marginTop: 14,
  },

  slideDescription: {
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
    maxWidth: "92%",
  },

  decorations: {
    ...StyleSheet.absoluteFillObject,
  },

  decorationLarge: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 35,
    right: -120,
    bottom: -110,
  },

  decorationSmall: {
    position: "absolute",
    width: 125,
    height: 125,
    borderRadius: 63,
    borderWidth: 20,
    left: -55,
    top: 120,
  },

  bottomControls: {
    paddingHorizontal: 18,
    paddingBottom: 22,
    paddingTop: 10,
  },

  indicators: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 15,
  },

  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#444444",
  },

  indicatorActive: {
    width: 24,
    backgroundColor: colors.yellow,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },

  previousButton: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 7,
  },

  previousText: {
    color: colors.white,
    fontWeight: "900",
  },

  nextButton: {
    flex: 1,
    height: 52,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.yellow,
    gap: 7,
  },

  nextButtonFull: {
    flex: 2,
  },

  nextText: {
    color: "#111111",
    fontWeight: "900",
  },

  pressed: {
    opacity: 0.7,
  },
});
