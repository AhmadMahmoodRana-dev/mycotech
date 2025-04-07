import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import COLOR_SCHEME from '../../colors/MainStyle';
import { SafeAreaView } from 'react-native-safe-area-context';

const CalenderPage = () => {
  // Mock data for marked dates (you can replace with your actual data)
  const markedDates = {
    '2025-03-15': { marked: true, dotColor: COLOR_SCHEME.accent },
    '2025-03-20': { marked: true, dotColor: COLOR_SCHEME.accent },
    '2025-03-25': { marked: true, dotColor: COLOR_SCHEME.accent },
    '2025-03-22': { marked: true, dotColor: COLOR_SCHEME.accent },
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        theme={{
          backgroundColor: COLOR_SCHEME.background,
          calendarBackground: COLOR_SCHEME.background,
          textSectionTitleColor: COLOR_SCHEME.text,
          selectedDayBackgroundColor: COLOR_SCHEME.primary,
          selectedDayTextColor: COLOR_SCHEME.text,
          todayTextColor: COLOR_SCHEME.secondary,
          dayTextColor: COLOR_SCHEME.text,
          textDisabledColor: COLOR_SCHEME.grayText,
          arrowColor: COLOR_SCHEME.text,
          monthTextColor: COLOR_SCHEME.text,
          indicatorColor: COLOR_SCHEME.accent,
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 20,
          textDayHeaderFontSize: 14,
        }}
        markedDates={markedDates}
        style={styles.calendar}
        firstDay={1}
        enableSwipeMonths={true}
        // Day component customization
        dayComponent={({ date, state }) => {
          return (
            <View style={styles.dayContainer}>
              <Text 
                style={[
                  styles.dayText,
                  state === 'disabled' && styles.disabledDay,
                  state === 'today' && styles.todayDay,
                ]}
              >
                {date.day}
              </Text>
              {markedDates[date.dateString]?.marked && (
                <View style={styles.dot} />
              )}
            </View>
          );
        }}
        // Header customization
        renderHeader={(date) => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              {date.toString('MMMM yyyy')}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_SCHEME.background,
  },
  calendar: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: COLOR_SCHEME.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
  },
  dayText: {
    color: COLOR_SCHEME.text,
    fontSize: 16,
  },
  disabledDay: {
    color: COLOR_SCHEME.grayText,
  },
  todayDay: {
    color: COLOR_SCHEME.secondary,
    fontWeight: 'bold',
  },
  dot: {
    position: 'absolute',
    bottom: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLOR_SCHEME.accent,
  },
  headerContainer: {
    backgroundColor: COLOR_SCHEME.primary,
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    color: COLOR_SCHEME.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CalenderPage;