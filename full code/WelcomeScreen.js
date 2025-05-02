import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged } from '@firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, setDoc } from '@firebase/firestore';

const WelcomeScreen = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); // New state for the user's phone number
  const [isLogin, setIsLogin] = useState(true);
  const auth = getAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set the user in state
        navigation.navigate('HomeTabs'); // Navigate to HomeTabs after successful login
      }
    });
    return () => unsubscribe();
  }, [auth, navigation]);

  const handleAuthentication = async () => {
    try {
      if (isLogin) {
        // Sign in the user
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in!');
      } else {
        // Sign up the user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's profile with their name
        await updateProfile(user, { displayName: name });

        // Save the phone number to Firestore
        const db = getFirestore();
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          phone, // Save the phone number
        });

        console.log('User created with name:', name, 'and phone:', phone);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
      {!isLogin && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad" // Ensure the keyboard is optimized for phone numbers
          />
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} />
      <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  input: { width: '80%', height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 16, paddingLeft: 8 },
  toggleText: { color: '#3498db', marginTop: 10 }
});

export default WelcomeScreen;
