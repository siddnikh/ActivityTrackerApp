import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { BlurView } from 'expo-blur';
import { colors } from '../colors';

const { width } = Dimensions.get('window');

const ItemDetailsScreen = ({ route, items, saveItems }) => {
  const { item } = route.params;
  const [count, setCount] = useState(0);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayCount = item.counts.find(c => c.date === today)?.count || 0;
    setCount(todayCount);
    updateMarkedDates();
  }, [item]);

  const updateMarkedDates = () => {
    const dates = {};
    const maxCount = Math.max(...item.counts.map(c => c.count), 1);
    item.counts.forEach(c => {
      const intensity = c.count / maxCount;
      dates[c.date] = { 
        customStyles: {
          container: {
            backgroundColor: `rgba(76, 217, 100, ${intensity})`,
          },
          text: {
            color: intensity > 0.5 ? colors.text : colors.secondary,
          },
        },
      };
    });
    setMarkedDates(dates);
  };

  const incrementCount = () => {
    const today = new Date().toISOString().split('T')[0];
    const newCount = count + 1;
    setCount(newCount);

    const updatedItems = items.map(i => {
      if (i.id === item.id) {
        const existingCountIndex = i.counts.findIndex(c => c.date === today);
        if (existingCountIndex !== -1) {
          i.counts[existingCountIndex].count = newCount;
        } else {
          i.counts.push({ date: today, count: newCount });
        }
      }
      return i;
    });

    saveItems(updatedItems);
    updateMarkedDates();
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={50} style={styles.blurContainer}>
        <View style={styles.header}>
          <Ionicons name={item.icon} size={48} color={colors.primary} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{count}</Text>
          <TouchableOpacity style={styles.incrementButton} onPress={incrementCount}>
            <Ionicons name="add" size={32} color={colors.text} />
          </TouchableOpacity>
        </View>
        <Calendar
          style={styles.calendar}
          theme={{
            calendarBackground: 'transparent',
            textSectionTitleColor: colors.text,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.text,
            todayTextColor: colors.primary,
            dayTextColor: colors.text,
            textDisabledColor: colors.textSecondary,
            monthTextColor: colors.text,
            arrowColor: colors.primary,
          }}
          markedDates={markedDates}
          markingType="custom"
        />
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  blurContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
  },
  incrementButton: {
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default ItemDetailsScreen;