import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../services/firebase'; // Import Firestore instance
import { addDoc, collection } from 'firebase/firestore';
import { primaryColor, secondaryColor, accentColor } from '../utils/colors';
import { getAuth } from 'firebase/auth';

const EventCard = ({ event }) => {

  // Function to add event to favourites
  const handleAddToFavorites = async () => {
    try {
      // Add event to 'favouriteEvents' collection
      await addDoc(collection(db, 'favouriteEvents'), {
        title: event.title,
        description: event.description,
        date: event.date,
        createdBy: getAuth().currentUser.uid
      });

      // Show a success message
      Alert.alert('Success', 'Event added to favourites!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add event to favourites.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>{event.date}</Text>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleAddToFavorites}>
        <Text style={styles.favoriteButtonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3, // Adds shadow for better separation
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  favoriteButton: {
    backgroundColor: primaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default EventCard;
