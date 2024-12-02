import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventList from '../components/EventList';
import  useEvents  from '../hooks/useEvents';

const HomeScreen = () => {
  const { events } = useEvents();

  return (
    <View style={styles.container}>
      <EventList events={events} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60
  },
});

export default HomeScreen;