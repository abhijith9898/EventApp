import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  FavouriteEvents  from '../components/FavouriteEvents';
import  useEvents  from '../hooks/useEvents';

const FavouriteScreen = () => {
  const { favouriteEvents } = useEvents();

  return (
    <View style={styles.container}>
      <FavouriteEvents events={favouriteEvents} />
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

export default FavouriteScreen;