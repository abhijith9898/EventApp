import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Event } from '../api/events';
import EventCard from './EventCard';

const EventList = ({ events }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCard event={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default EventList;