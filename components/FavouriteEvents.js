import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Event } from '../api/events';
import EventCardFavourite from './EventCardFavourite';
const FavouriteEvents = ({ events }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <EventCardFavourite event={item} eventId={item.id}/>
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

export default FavouriteEvents;