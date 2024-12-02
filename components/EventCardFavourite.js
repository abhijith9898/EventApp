import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db } from '../services/firebase'; 
import { doc, deleteDoc } from 'firebase/firestore';
import { primaryColor, secondaryColor, accentColor } from '../utils/colors';

const EventCardFavourite = ({ event, eventId }) => {


  const handleRemoveFromFavorites = async () => {
    try {

      const eventRef = doc(db, 'favouriteEvents', eventId);


      await deleteDoc(eventRef);


      Alert.alert('Success', 'Event removed from favourites!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to remove event from favourites.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.date}>{event.date}</Text>

      <TouchableOpacity style={styles.favoriteButton} onPress={handleRemoveFromFavorites}>
        <Text style={styles.favoriteButtonText}>Remove from Favorites</Text>
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
    elevation: 3, 
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
    backgroundColor: accentColor, 
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

export default EventCardFavourite;
