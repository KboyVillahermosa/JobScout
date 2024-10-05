import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import JobBoard from './screens/JobBoard';
import JobDescription from './screens/JobDescription';
import Music from './screens/Home/Music';
import Profile from './screens/Profile';
import AlbumsScreen from './screens/AlbumsScreen';
import JobCategoryScreen from './screens/JobCategoryScreen';
import ProfileCompletionScreen from './screens/ProfileCompletionScreen';
import CategoriesScreen from './screens/CategoriesScreen';

// Create the stack navigator
const Stack = createStackNavigator();

// Define your navigation structure
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Albums" component={AlbumsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="JobBoard" component={JobBoard} options={{ title: 'Job Board' }} />
      <Stack.Screen name="JobDescription" component={JobDescription} options={{ title: 'Job Description' }} />
      <Stack.Screen name="Music" component={Music} options={{ title: 'Music' }} />
      <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      <Stack.Screen name="JobCategory" component={JobCategoryScreen} options={{ title: 'Job Categories' }} />
      <Stack.Screen name="ProfileCompletion" component={ProfileCompletionScreen} options={{ title: 'Profile Completion' }} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
    </Stack.Navigator>
  );
};

// Main App component
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
