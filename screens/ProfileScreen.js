import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { auth, db } from '../services/firebase'; // Import Firestore db
import { primaryColor, secondaryColor, accentColor, textColor } from '../utils/colors';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'; // Firestore functions

const ProfileScreen = ({ navigation }) => {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchUserEvents = () => {
      try {
        const userId = auth.currentUser.uid;
        const eventsRef = collection(db, 'events'); 
        const q = query(eventsRef, where('createdBy', '==', userId)); 
  
        const unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setUserEvents(events); 
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching events:', error);
            setLoading(false);
          }
        );
  
        
      } catch (error) {
        console.error('Error setting up real-time listener:', error);
        setLoading(false);
      }
    };
  
    const unsubscribe = fetchUserEvents();
  
    return () => unsubscribe && unsubscribe();
  }, []);
  

  const handleEdit = (event) => {
    navigation.navigate('EditEvent', { event }); // Navigate to EditEventScreen and pass event
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text style={styles.eventDescription}>{item.description}</Text>
      <Text style={styles.eventDate}>{item.date}</Text>

      <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.subtitle}>Welcome to your profile</Text>

      {/* Display user's events */}
      {loading ? (
        <Text>Loading events...</Text>
      ) : userEvents.length > 0 ? (
        <FlatList
          data={userEvents}
          keyExtractor={(item) => item.id}
          renderItem={renderEvent}
        />
      ) : (
        <Text>No events created yet.</Text>
      )}

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondaryColor, // Background color for the screen
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: textColor,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: accentColor,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signOutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  eventContainer: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: primaryColor,
  },
  eventDescription: {
    fontSize: 16,
    color: textColor,
    marginVertical: 4,
  },
  eventDate: {
    fontSize: 14,
    color: accentColor,
  },
  editButton: {
    backgroundColor: accentColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
