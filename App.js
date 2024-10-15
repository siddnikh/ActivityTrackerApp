import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import ItemDetailsScreen from './screens/ItemDetailsScreen';
import { colors } from './colors';
import { sampleItems } from './sampleData';

const Stack = createStackNavigator();

const USE_SAMPLE_DATA = false;

export default function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      if (USE_SAMPLE_DATA) {
        setItems(sampleItems);
        await AsyncStorage.setItem('trackedItems', JSON.stringify(sampleItems));
      } else {
        const storedItems = await AsyncStorage.getItem('trackedItems');
        if (storedItems !== null) {
          setItems(JSON.parse(storedItems));
        }
      }
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const saveItems = async (newItems) => {
    try {
      await AsyncStorage.setItem('trackedItems', JSON.stringify(newItems));
      setItems(newItems);
    } catch (error) {
      console.error('Error saving items:', error);
    }
  };


  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
              borderBottomWidth: 0,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            cardStyle: { backgroundColor: colors.secondary },
          }}
        >
          <Stack.Screen 
            name="Activities" 
            options={{ headerShown: false }}
          >
            {props => <HomeScreen {...props} items={items} saveItems={saveItems} />}
          </Stack.Screen>
          <Stack.Screen 
            name="AddItem" 
            options={{ title: 'Add New Activity' }}
          >
            {props => <AddItemScreen {...props} items={items} saveItems={saveItems} />}
          </Stack.Screen>
          <Stack.Screen 
            name="ItemDetails" 
            options={({ route }) => ({ title: route.params.item.name })}
          >
            {props => <ItemDetailsScreen {...props} items={items} saveItems={saveItems} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}