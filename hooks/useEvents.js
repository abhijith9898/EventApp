import { useState, useEffect } from 'react';
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // To get the current user's UID

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [favouriteEvents, setFavouriteEvents] = useState([]);
  const db = getFirestore(); // Initialize Firestore
  const auth = getAuth(); // Initialize Firebase Auth
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const eventsCollectionRef = collection(db, 'events');
    const q = query(eventsCollectionRef);
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const events = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID if needed
          ...doc.data(),
        }));
        setEvents(events);
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );

    return unsubscribe; // Clean up the listener
  }, [db, currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const favouritesCollectionRef = collection(db, 'favouriteEvents');
    const q = query(favouritesCollectionRef, where('createdBy', '==', currentUser.uid)); // Add where condition
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const favouriteEvents = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID if needed
          ...doc.data(),
        }));
        setFavouriteEvents(favouriteEvents);
      },
      (error) => {
        console.error('Error fetching favourite events:', error);
      }
    );

    return unsubscribe; // Clean up the listener
  }, [db, currentUser]);

  const addEvent = async (event) => {
    try {
      const eventsCollectionRef = collection(db, 'events');
      await addDoc(eventsCollectionRef, event);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const addFavouriteEvent = async (event) => {
    try {
      const favouritesCollectionRef = collection(db, 'favouriteEvents');
      await addDoc(favouritesCollectionRef, event);
    } catch (error) {
      console.error('Error adding favourite event:', error);
    }
  };

  return {
    events,
    favouriteEvents,
    addEvent,
    addFavouriteEvent,
  };
};

export default useEvents;
