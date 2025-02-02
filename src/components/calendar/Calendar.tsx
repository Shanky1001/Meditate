import {StyleSheet} from "react-native";
import React, {useMemo} from "react";
import {DateData, Calendar as RNCalendar} from "react-native-calendars";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {selectCalendar} from "../../redux/slices/meditationSlice";
import {useThemeColor} from "../../theme/Themed";

export default function Calendar({onDayPress}: {onDayPress: (value: DateData) => void}) {
  const white = useThemeColor({}, "white");
  const primary = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");
  const calendar = useSelector(selectCalendar);
  const today = dayjs().format("YYYY-MM-DD");
  const markedDates = {
    [today]: {marked: true},
    ...calendar,
  };

  const CalendarTheme = useMemo(() => {
    return {
      backgroundColor: white,
      calendarBackground: white,
      textSectionTitleColor: "#b6c1cd",
      selectedDayBackgroundColor: primary,
      selectedDayTextColor: white,
      todayTextColor: primary,
      dayTextColor: textColor,
      textDisabledColor: "#d9e1e8",
      dotColor: primary,
      selectedDotColor: white,
      arrowColor: textColor,
      monthTextColor: textColor,
      indicatorColor: "blue",
      textDayFontWeight: "300",
      textMonthFontWeight: "bold",
      textDayHeaderFontWeight: "300",
      textDayFontSize: 16,
      textMonthFontSize: 16,
      textDayHeaderFontSize: 16,
    };
  }, [white, primary, textColor]);

  return <RNCalendar style={styles.calendar} markedDates={markedDates} onDayPress={onDayPress} theme={CalendarTheme} maxDate={today} />;
}

const styles = StyleSheet.create({
  calendar: {
    marginRight: 14,
    marginBottom: 30,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
