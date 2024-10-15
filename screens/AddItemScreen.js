import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { colors } from '../colors';

const iconOptions = [
  'fitness', 'water', 'book', 'bicycle', 'cafe', 'walk', 'basketball', 'bed',
  'briefcase', 'car', 'cart', 'cash', 'fast-food', 'game-controller', 'gift',
  'heart', 'library', 'medical', 'musical-notes', 'paw', 'pizza', 'school',
  'star', 'timer', 'trophy', 'umbrella', 'videocam', 'wallet', 'wine'
];

const AddItemScreen = ({ navigation, items, saveItems }) => {
  const [name, setName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState(new Date());

  const handleSave = () => {
    if (name && selectedIcon) {
      const newItem = {
        id: Date.now().toString(),
        name,
        icon: selectedIcon,
        reminder,
        reminderTime: reminder ? reminderTime : null,
        counts: [],
      };
      saveItems([...items, newItem]);
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <BlurView intensity={50} style={styles.blurContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter activity name"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={styles.label}>Icon</Text>
        <View style={styles.iconContainer}>
          {iconOptions.map(icon => (
            <TouchableOpacity
              key={icon}
              style={[styles.iconOption, selectedIcon === icon && styles.selectedIcon]}
              onPress={() => setSelectedIcon(icon)}
            >
              <Ionicons name={icon} size={24} color={selectedIcon === icon ? colors.text : colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.reminderContainer}>
          <Text style={styles.label}>Set Reminder</Text>
          <TouchableOpacity onPress={() => setReminder(!reminder)}>
            <Ionicons name={reminder ? 'checkbox' : 'square-outline'} size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {reminder && (
          <DateTimePicker
            value={reminderTime}
            mode="time"
            is24Hour={true}
            display="spinner"
            style={{backgroundColor: '#8E8E93'}}
            onChange={(event, selectedTime) => setReminderTime(selectedTime)}
            textColor="##04E8C6"
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </BlurView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  blurContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: colors.text,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  iconOption: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 25,
    margin: 5,
  },
  selectedIcon: {
    backgroundColor: colors.primary,
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  saveButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddItemScreen;
