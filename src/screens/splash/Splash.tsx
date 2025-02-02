import React, {useEffect} from "react";
import {StyleSheet, Animated} from "react-native";
import {ThemedText, ThemedView, useThemeColor} from "../../theme/Themed";
import MIcon from "../../components/common/MIcon";
import {useSelector} from "react-redux";
import {selectTodayQuote} from "../../redux/slices/meditationSlice";

interface SplashProps {
  onAnimationComplete: () => void;
}
const SPLASH_DURATION = 4000;
export default function SplashScreen({onAnimationComplete}: SplashProps) {
  const logoOpacity = new Animated.Value(0);
  const logoTranslate = new Animated.Value(50);
  const quoteOpacity = new Animated.Value(0);
  const {quote, author} = useSelector(selectTodayQuote);
  const IconColor = useThemeColor({}, "primary");

  useEffect(() => {
    // Animation sequence
    const splashAnimation = Animated.sequence([
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
    ]);

    // Start animation and call completion handler
    splashAnimation.start(() => {
      setTimeout(() => {
        onAnimationComplete();
      }, SPLASH_DURATION);
    });

    return () => {
      splashAnimation.stop();
    };
  }, [onAnimationComplete]);

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: logoOpacity,
            transform: [{translateY: logoTranslate}],
          },
        ]}>
        <MIcon family="MaterialIcons" name="self-improvement" size={80} color={IconColor} />
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 48,
  },
  quoteContainer: {
    alignItems: "center",
    maxWidth: "80%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
  },
  quote: {
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: 12,
  },
  author: {
    fontSize: 14,
    fontWeight: "500",
  },
});
