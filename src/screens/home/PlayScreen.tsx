import {Image, StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import ScreenWrapper from "../ScreenWrapper";
import {ThemedText, useThemeColor} from "../../theme/Themed";
import {CompositeNavigationProp, RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {HomeParamList, MainStackParamList} from "../../../types";
import {GetMeditationData} from "../../Providers/ContextProvider";
import PlayerControl from "../../components/playerControls/PlayerControl";
import NotFound from "../notFound/NotFound";
import usePlayer from "../../hooks/usePlayer";
import {ActivityIndicator} from "react-native-paper";
import {formatTime} from "../../utils";

type PlayRouteProp = RouteProp<HomeParamList, "PlayScreen">;

type PlayNavProp = CompositeNavigationProp<StackNavigationProp<HomeParamList, "PlayScreen">, StackNavigationProp<MainStackParamList>>;
interface PlayScreenProps {
  route: PlayRouteProp;
  navigation: PlayNavProp;
}

const PlayScreen = ({route, navigation}: PlayScreenProps) => {
  const {id} = route.params;
  const Mediation = GetMeditationData().getMeditationDataById(id);
  const primary = useThemeColor({}, "primary");
  if (!Mediation) return <NotFound />;
  const {title, subtitle, image, uri} = Mediation;
  const {isPlaying, duration, currentTime, progress, isMusicLoading, repeat, forward, pause, play, loop} = usePlayer({uri});

  useEffect(() => {
    play();
  }, []);

  if (isMusicLoading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator animating color={primary} />
      </View>
    );

  return (
    <ScreenWrapper style={styles.container}>
      <Image source={image} style={styles.image} />
      <ThemedText style={styles.title}>{title}</ThemedText>
      <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
      <PlayerControl
        durationTime={formatTime(duration)}
        positionTime={formatTime(currentTime)}
        progress={progress}
        repeat={repeat}
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onReplay={() => forward(-10)}
        onRepeat={loop}
        forward={() => forward(10)}
      />
    </ScreenWrapper>
  );
};

export default PlayScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 31,
    paddingRight: 31,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    maxWidth: 300,
    maxHeight: 300,
    marginBottom: 30,
    borderRadius: 10,
    alignSelf: "center",
  },
});
