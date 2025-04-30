import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from '@firebase/firestore';
import { getAuth } from '@firebase/auth'; // for user info if needed
import { FirebaseError, initializeApp } from 'firebase/app';
import { db } from './firebase.tsx';



const AddEventScreen = ({ addEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [invite, setInvite] = useState('');

  // Function to handle form submission and save event to Firestore
  const handleSubmit = async () => {
    if (title && date) {
      // Prepare the event object to be saved
      const event = { title, date, description, invite };
      
      // Save event to Firebase Firestore
      try {
        const docRef = await addDoc(collection(db, 'events'), event); // 'events' is the Firestore collection
        console.log('Event added with ID: ', docRef.id);

        // Call the parent function to update the state in the parent component
        addEvent({ ...event, id: docRef.id });

        // Reset form
        setTitle('');
        setDate('');
        setDescription('');
        setInvite('');

        Alert.alert('Success', 'Event added successfully!');
      } catch (e) {
        console.error('Error adding event to Firestore: ', e);
        Alert.alert('Error', 'There was an error adding the event.');
      }
    } else {
      Alert.alert('Error', 'Please fill in at least the title and date.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title" />

      <Text style={styles.label}>Event Date</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="Enter date" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Invite</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={invite}
        onChangeText={setInvite}
        placeholder="Enter invite"
        multiline
      />

      <Button title="Add Event" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
});

export default AddEventScreen;
