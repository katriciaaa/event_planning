import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';


const AddEventScreen = ({ addEvent }: { addEvent: (event: any) => void }) => {
 const [title, setTitle] = useState('');
 const [date, setDate] = useState('');
 const [description, setDescription] = useState('');


 const handleSubmit = () => {
   if (title && date) {
     addEvent({ title, date, description });
     setTitle('');
     setDate('');
     setDescription('');
     Alert.alert('Success', 'Event added!');
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


     <Button title="Add Event" onPress={handleSubmit} />
   </View>
 );
}


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


export default  AddEventScreen;
