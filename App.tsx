import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './pageFiles/navigatePage';
import ProfileScreen from './pageFiles/InitialPage';
import { AfterCamera } from './pageFiles/afterCamera';
import { IngredientsCheck } from './pageFiles/ingredientsCheck';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ProfileScreen'>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AfterCamera" component={AfterCamera} options={{ headerShown: false }} />
        <Stack.Screen name="AfterIngredients" component={IngredientsCheck}  options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;