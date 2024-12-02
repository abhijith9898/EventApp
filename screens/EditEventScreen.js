import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore'; // Firestore functions
import { primaryColor, secondaryColor, accentColor, textColor } from '../utils/colors';

const EditEventScreen = ({ route, navigation }) => {
  const { event } = route.params; // Get event data from ProfileScreen
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);

  const handleSave = async () => {
    try {
      const eventRef = doc(db, 'events', event.id);
      await updateDoc(eventRef, {
        title,
        description,
        date,
      });
      Alert.alert('Success', 'Event updated successfully!');
      navigation.goBack(); // Go back to the Profile screen
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update event.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondaryColor,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: textColor,
  },
  saveButton: {
    backgroundColor: accentColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EditEventScreen;
