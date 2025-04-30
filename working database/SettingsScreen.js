import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { getAuth, signOut } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation(); 
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        Alert.alert('Signed out successfully');
        navigation.navigate('Welcome'); 
      })
      .catch((error) => {
        Alert.alert('Error signing out', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <View style={styles.bottomButton}>
        <Button title="Sign Out" onPress={handleSignOut} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
  text: { fontSize: 18, marginBottom: 20 },
  bottomButton: { width: '80%', marginBottom: 20 },
});

export default SettingsScreen;
