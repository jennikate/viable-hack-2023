import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './src/screens/CategoriesScreen';
import MealsScreen from './src/screens/MealsScreen';
import RecipeDetails from './src/screens/RecipeDetails';

// TODO: proper dark mode management
// TODO: add a search for recipe feature
// TODO: add landing screen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ contentStyle: { backgroundColor: '#000000' } }} >
          <Stack.Screen name="Get random recipies containing..." component={CategoriesScreen} />
          <Stack.Screen name="Recipes" component={MealsScreen} />
          <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
        </Stack.Navigator>
    </NavigationContainer >
    </>
  );
}

const styles = StyleSheet.create({
});
