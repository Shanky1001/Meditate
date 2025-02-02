import React, {useEffect} from "react";
import {StyleSheet, View, Animated, Dimensions} from "react-native";
import {ThemedText} from "../../theme/Themed";
import MIcon from "../../components/common/MIcon";
import {useDispatch} from "react-redux";
import {useQuote} from "../../hooks/useQuote";
import {updateTodayQuote} from "../../redux/slices/meditationSlice";
import {getDimensions} from "../../utils";

export default function SplashScreen() {
  const logoOpacity = new Animated.Value(0);
  const logoTranslate = new Animated.Value(50);
  const quoteOpacity = new Animated.Value(0);

  const dispatch = useDispatch();
  const {quote, author} = useQuote();

  useEffect(() => {
    dispatch(updateTodayQuote({quote, author}));
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslate, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(quoteOpacity, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{translateY: logoTranslate}],
          },
        ]}>
        <MIcon family="MaterialIcons" name="self-improvement" size={80} color="#6B4EFF" />
        <ThemedText style={styles.title}>Meditate</ThemedText>
      </Animated.View>

      <Animated.View
        style={[
          styles.quoteContainer,
          {
            opacity: quoteOpacity,
          },
        ]}>
        <ThemedText style={styles.quote}>{quote}</ThemedText>
        <ThemedText style={styles.author}>- {author}</ThemedText>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
  },
  quoteContainer: {
    alignItems: "center",
    maxWidth: getDimensions().width * 0.8,
  },
  quote: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: 12,
    color: "#666666",
  },
  author: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888888",
  },
});
