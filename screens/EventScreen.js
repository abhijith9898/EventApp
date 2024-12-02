import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EventForm from '../components/EventForm';
import useEvents from '../hooks/useEvents';
import { primaryColor, secondaryColor, backgroundColor, textColor, accentColor } from '../utils/colors';
import { getAuth } from 'firebase/auth';

const EventScreen = ({ navigation }) => {
  const { addEvent } = useEvents();

  const handleSubmit = async (event) => {

    console.log("EVENT: ", event)
    event = {...event, createdBy: getAuth().currentUser.uid}
    try {
      await addEvent(event);
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create New Event</Text>
      <Text style={styles.subtitle}>Fill in the details below to create an event.</Text>
      <EventForm onSubmit={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: backgroundColor,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: primaryColor,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: textColor,
    textAlign: 'center',
    marginBottom: 24,
  },
});

export default EventScreen;
