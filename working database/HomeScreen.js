// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { db } from './firebase';  // Import db from App.js
import { collection, getDocs } from '@firebase/firestore';
import EventItems from './EventItems';

const HomeScreen = ({ events }) => {
  const [firestoreEvents, setFirestoreEvents] = useState([]);

  // Fetch events from Firestore on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsList = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id, // Add doc ID to each event
        }));
        setFirestoreEvents(eventsList); // Update state with fetched events
      } catch (e) {
        console.error("Error getting events: ", e);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={firestoreEvents} // Use fetched events
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <EventItems event={item} />}
        ListEmptyComponent={<Text>No events yet. Add one!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});

export default HomeScreen;
