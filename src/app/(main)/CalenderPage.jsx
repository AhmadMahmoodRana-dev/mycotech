import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import COLOR_SCHEME from '../../colors/MainStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
const CalendarPage = () => {
  const [selected, setSelected] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Technician Calendar</Text>
      <Calendar
        theme={{
          backgroundColor: COLOR_SCHEME.primary,
          calendarBackground: COLOR_SCHEME.primary,
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: COLOR_SCHEME.background,
          selectedDayTextColor: '#ffffff',
          todayTextColor: COLOR_SCHEME.background,
          dayTextColor: '#e1e1e1',
          textDisabledColor: '#444',
          arrowColor: COLOR_SCHEME.grayText,
          monthTextColor: '#ffffff',
          indicatorColor: COLOR_SCHEME.background,
        }}
        onDayPress={(day) => setSelected(day.dateString)}
        markedDates={{
          [selected]: { selected: true, selectedColor: '#6200ea' },
        }}
      />
      {selected ? <Text style={styles.selectedDate}>Selected Date: {selected}</Text> : null}
    </SafeAreaView>
  );
};

export default CalendarPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR_SCHEME.background ,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
    color: COLOR_SCHEME.background,
    textAlign: 'center',
  },
});
