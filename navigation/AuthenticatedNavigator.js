import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Icon library
import HomeScreen from '../screens/HomeScreen';
import EventScreen from '../screens/EventScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditEventScreen from '../screens/EditEventScreen';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()
const ProfileStack = () => {
    return (
    <Stack.Navigator>
    <Stack.Screen name="profile" component={ProfileScreen} />
    <Stack.Screen name="EditEvent" component={EditEventScreen} />
    </Stack.Navigator>
    );
}
const AuthenticatedNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Event') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Favourite') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato', // Color for active tab
          tabBarInactiveTintColor: 'gray', // Color for inactive tab
          headerShown: false, // Disable header for tabs
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Event" component={EventScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Profile" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedNavigator;
