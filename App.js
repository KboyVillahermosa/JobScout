import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens//Home';
import Albums from './screens/Albums';
import JobBoard from './screens/JobBoard'
import JobDescription from './screens/JobDescription';
import { auth } from './firebase'; // Ensure correct path to your firebase.js

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Albums" component={Albums} />
        <Stack.Screen name="JobBoard" component={JobBoard} />
        <Stack.Screen name="JobDescription" component={JobDescription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}