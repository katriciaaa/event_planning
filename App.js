import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { getAuth, onAuthStateChanged, signOut } from '@firebase/auth';
import { initializeApp } from '@firebase/app';

// screens
import HomeScreen from './HomeScreen';
import AddEventScreen from './AddEventScreen';
import WelcomeScreen from './WelcomeScreen';
import MyProfileScreen from './MyProfileScreen';

const firebaseConfig = {
  apiKey: "AIzaSyAAgFoRQIkAUh31jgRTJ0_3DHH-oLQYFPw",
  authDomain: "loginfirebase-377fb.firebaseapp.com",
  projectId: "loginfirebase-377fb",
  storageBucket: "loginfirebase-377fb.firebasestorage.app",
  messagingSenderId: "817013783932",
  appId: "1:817013783932:web:954db9a50e4904cf19f8f9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
      <Tab.Screen name="Home" component={HomeWrapper} />
      <Tab.Screen name="Add Event" component={AddEventWrapper} />
      <Tab.Screen name="My Profile" component={MyProfileScreen} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome">
          {(props) => <WelcomeScreen {...props} setUser={setUser} />}
        </Stack.Screen>

        {/* Ensure 'HomeTabs' is always available in the navigator */}
        <Stack.Screen name="HomeTabs" options={{ headerShown: false }}>
          {() => (user ? <TabNavigator /> : <WelcomeScreen setUser={setUser} />)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
