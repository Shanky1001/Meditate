import {Animated, Easing} from "react-native";

export type TransitionSpec =
  | {
      animation: "spring";
      config: Omit<Animated.SpringAnimationConfig, "toValue" | keyof Animated.AnimationConfig>;
    }
  | {
      animation: "timing";
      config: Omit<Animated.TimingAnimationConfig, "toValue" | keyof Animated.AnimationConfig>;
    };
export default function useTransition() {
  // Fade Transition
  const forFade = ({current, next}: any) => {
    const opacity = Animated.add(current.progress, next ? next.progress : 0).interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0],
    });

    return {
      cardStyle: {
        opacity,
      },
    };
  };

  // Slide Transition
  const forSlide = ({current, next, inverted, layouts: {screen}}: any) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          })
        : 0,
    );

    const translateX = Animated.multiply(
      progress.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [screen.width, 0, -screen.width],
        extrapolate: "clamp",
      }),
      inverted,
    );

    return {
      cardStyle: {
        transform: [{translateX}],
      },
    };
  };

  // Custom Transition Spec
  const customTransitionSpec: TransitionSpec = {
    animation: "timing",
    config: {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    },
  };
  return {forFade, forSlide, customTransitionSpec};
}
