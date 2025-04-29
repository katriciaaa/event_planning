import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import EventItems from './EventItems';

const HomeScreen = ({ events }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Events</Text>
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <EventItem event={item} />}
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
