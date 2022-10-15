import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './pages/Home';
import Meals from './pages/Meals';
import Detail from './pages/Detail';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {color: 'orange', fontWeight: 'bold', fontSize: 24},
          headerTitleAlign: 'center',
          headerTintColor: 'orange',
          headerBackTitleVisible: true,
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={Home}
          options={{
            headerTitle: 'Categories',
          }}
        />
        <Stack.Screen
          name="MealsScreen"
          component={Meals}
          options={{
            headerTitle: 'Meals',
            headerBackTitle: 'Categories',
          }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={Detail}
          options={{
            headerTitle: 'Detail',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
