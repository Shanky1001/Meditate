import {ScrollView, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import ScreenWrapper from "../ScreenWrapper";
import {ThemedText, useThemeColor} from "../../theme/Themed";
import {Card, Paragraph, Title} from "react-native-paper";
import MIcon from "../../components/common/MIcon";
import {getPlural} from "../../utils";
import Calendar from "../../components/calendar/Calendar";
import {DateData} from "react-native-calendars";
import ManualEntry from "../../components/calendar/ManualEntry";
import {useSelector} from "react-redux";
import {selectTodayQuote} from "../../redux/slices/meditationSlice";

export default function Statistics() {
  const primary = useThemeColor({}, "primary");
  const bgColor = useThemeColor({}, "background");
  const [manualEntryTime, setManualEntryTime] = useState<number>();
  const {quote, author} = useSelector(selectTodayQuote);
  const streak = 10;
  const totalSessions = 10;
  const listenedStat = 10;
  const handleManualEntry = (value: DateData) => {
    const {day, month, year} = value;
    const newTimestamp = new Date(year, month - 1, day).getTime();
    if (newTimestamp < Date.now()) {
      setManualEntryTime(newTimestamp);
    }
  };
  return (
    <>
      <ScreenWrapper scroll>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
          <Card elevation={1} style={[styles.card, {backgroundColor: bgColor}]}>
            <Card.Content style={styles.cardContent}>
              <MIcon name="trophy" family="FontAwesome5" size={24} color={primary} style={styles.icon} />
              <Paragraph><ThemedText>Current Streak</ThemedText></Paragraph>
              <Title>
                <ThemedText>{streak} {getPlural(streak, "day")}</ThemedText>
              </Title>
            </Card.Content>
          </Card>
          <Card elevation={1} style={[styles.card, {backgroundColor: bgColor}]}>
            <Card.Content style={styles.cardContent}>
              <MIcon family="FontAwesome5" name="calendar" style={styles.icon} size={24} color={primary} />
              <Paragraph>
                <ThemedText>Total Sessions</ThemedText>
              </Paragraph>
              <Title>
                <ThemedText>
                  {totalSessions} {getPlural(totalSessions, "session")}
                </ThemedText>
              </Title>
            </Card.Content>
          </Card>
          <Card elevation={1} style={[styles.card, {backgroundColor: bgColor}]}>
            <Card.Content style={styles.cardContent}>
              <MIcon family="FontAwesome5" name="clock" style={styles.icon} size={24} color={primary} />
              <Paragraph>
                <ThemedText>Time Meditated</ThemedText>
              </Paragraph>
              <Title>
                <ThemedText>{listenedStat}</ThemedText>
              </Title>
            </Card.Content>
          </Card>
        </ScrollView>
        <Calendar key={manualEntryTime} onDayPress={handleManualEntry} />
        <View style={styles.quoteContainer}>
          <Card elevation={1} style={[styles.quoteCard, {backgroundColor: bgColor}]}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.quoteTitle}>
                <ThemedText>"{quote}"</ThemedText>
              </Title>
              <Paragraph style={styles.quoteAuthor}>
                <ThemedText>~{author}</ThemedText>
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScreenWrapper>
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <ManualEntry timestamp={manualEntryTime} onDismiss={() => setManualEntryTime(undefined)} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  card: {
    width: 150,
    marginRight: 10,
    textAlign: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  icon: {
    marginBottom: 10,
  },
  quoteContainer: {marginRight: 10, marginBottom: 30},
  quoteCard: {
    width: "100%",
  },
  quoteTitle: {
    textAlign: "center",
  },
  quoteAuthor: {
    textAlign: "right",
  },
});
