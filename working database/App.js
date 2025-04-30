// App.js
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { app } from './firebase.tsx';
import { auth } from './firebase.tsx'; // Import the auth instance from firebase.tsx

// screens
import HomeScreen from './HomeScreen';
import AddEventScreen from './AddEventScreen';
import WelcomeScreen from './WelcomeScreen';
import MyProfileScreen from './MyProfileScreen';
import SettingsScreen from './SettingsScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Set the user state when authentication state changes
    });
    return () => unsubscribe();
  }, []);

  const addEvent = (event) => setEvents([...events, event]);

  const HomeWrapper = () => <HomeScreen events={events} />;
  const AddEventWrapper = () => <AddEventScreen addEvent={addEvent} />;

  const TabNavigator = () => (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color="blue" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Event"
        component={AddEventWrapper}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color="blue" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={MyProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color="blue" size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color="blue" size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome">
          {(props) => <WelcomeScreen {...props} setUser={setUser} />}
        </Stack.Screen>
        <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
          {() => (user ? <TabNavigator /> : <WelcomeScreen setUser={setUser} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
