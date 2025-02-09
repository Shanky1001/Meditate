import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import MIcon from "../common/MIcon";
import {ThemedText, ThemedView, useThemeColor} from "../../theme/Themed";

interface PlayerControlProps {
  positionTime?: string;
  durationTime?: string;
  isPlaying?: boolean;
  progress?: number;
  repeat?: boolean;
  onPause?: () => void;
  onPlay?: () => void;
  onReplay?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onLike?: () => void;
  onRepeat?: () => void;
  forward?: () => void;
  onShuffle?: () => void;
}
const defFunc = () => {};

export default function PlayerControl({
  positionTime = "",
  durationTime = "",
  isPlaying = false,
  progress = 0,
  repeat = false,
  onPlay = defFunc,
  onPause,
  onReplay = defFunc,
  forward = defFunc,
  onLike = defFunc,
  onRepeat = defFunc,
  onShuffle = defFunc,
}: PlayerControlProps) {
  const black = useThemeColor({}, "black");
  const white = useThemeColor({}, "white");
  const primary = useThemeColor({}, "primary");
  return (
    <ThemedView style={styles.container}>
      {/* Progress Bar and Time */}
      <View style={styles.progressContainer}>
        <ThemedText style={styles.timeText}>{positionTime}</ThemedText>
        <View style={[styles.progressBar, {backgroundColor: black}]}>
          <View style={[styles.progress, {width: `${progress * 100}%`, backgroundColor: white}]} />
          <View style={[styles.progressKnob, {left: `${progress * 100}%`, backgroundColor: black}]} />
        </View>
        <ThemedText style={styles.timeText}>{durationTime}</ThemedText>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        {onRepeat ? (
          <TouchableOpacity onPress={onRepeat} style={styles.iconButton}>
            <MIcon family="MaterialIcons" name="repeat" size={24} color={repeat ? primary : black} />
          </TouchableOpacity>
        ) : null}

        {onReplay ? (
          <TouchableOpacity onPress={onReplay} style={styles.iconButton}>
            <MIcon family="MaterialIcons" name="replay-10" size={24} color={black} />
          </TouchableOpacity>
        ) : null}

        {onPlay ? (
          <TouchableOpacity onPress={isPlaying ? onPause : onPlay} style={styles.playButton}>
            <MIcon family="MaterialIcons" name={isPlaying ? "pause" : "play-arrow"} size={32} color={black} />
          </TouchableOpacity>
        ) : null}

        {forward ? (
          <TouchableOpacity onPress={forward} style={styles.iconButton}>
            <MIcon family="MaterialIcons" name="forward-10" size={24} color={black} />
          </TouchableOpacity>
        ) : null}

        {onLike ? (
          <TouchableOpacity onPress={onLike} style={styles.iconButton}>
            <MIcon family="MaterialIcons" name="favorite-border" size={24} color={black} />
          </TouchableOpacity>
        ) : null}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
    marginHorizontal: 8,
  },
  progressBar: {
    flex: 1,
    height: 2,
    borderRadius: 2,
    position: "relative",
  },
  progress: {
    position: "absolute",
    top: -1,
    height: 4,
    borderRadius: 2,
  },
  progressKnob: {
    position: "absolute",
    top: -5,
    marginLeft: -5,
    width: 10,
    height: 10,
    borderRadius: 6,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});
