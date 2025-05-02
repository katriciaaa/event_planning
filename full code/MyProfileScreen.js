import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from '@firebase/auth';

const MyProfileScreen = ({ userName, userPhone, profileImage, setProfileImage }) => {
  const handleChoosePhoto = async () => {
    try {
      // Request permission to access the media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'You need to allow access to your camera roll.');
        return;
      }

      // Open the image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1], // Crop the image to a square
        quality: 1, // High-quality image
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri); // Update the profile image state
      }
    } catch (error) {
      console.error('Error picking image: ', error);
      Alert.alert('Error', 'Failed to pick an image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileRow}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.imageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Text style={styles.placeholderText}>+</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.separator} />
      <Text style={styles.header}>Contact Info:</Text>
      <Text style={styles.label}>User Email: {getAuth().currentUser?.email}</Text>
      <Text style={styles.label}>User Phone: {userPhone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  container: { flex: 1, padding: 16 },
  profileRow: {
    flexDirection: 'row', // Align profile photo and name horizontally
    alignItems: 'center', // Align items vertically in the center
    marginBottom: 20, // Add spacing below the row
  },
  imageContainer: {
    width: 120, // Increased size
    height: 120, // Increased size
    borderRadius: 60, // Half of width/height for a perfect circle
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60, // Match the borderRadius of the container
  },
  placeholderText: {
    fontSize: 30, // Adjusted font size for larger circle
    color: '#888',
  },
  userName: {
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 15, // Add spacing between the photo and the name
  },
  separator: {
    height: 1, // Thickness of the line
    backgroundColor: '#ccc', // Line color
    marginVertical: 20, // Spacing above and below the line
  },
  label: {
    fontSize: 16,
    color: '#555',
    textAlign: ';eft',
  },
});

export default MyProfileScreen;