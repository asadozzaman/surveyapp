import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Dashboard,
  AddQuestionScreen,
  CreateQuizScreen,
  HomeScreen,
  PlayQuizScreen,
  SurveyScreen,
  DailySurveyScreen,
  BeutyDesign,
  TaskScreen,
  DailyChallenges

} from '../screens';

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen} />
      <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen} />
      <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen} />
      <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
      <Stack.Screen name="DailySurveyScreen" component={DailySurveyScreen} />
      <Stack.Screen name="BeutyDesign" component={BeutyDesign} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
      <Stack.Screen name="DailyChallenges" component={DailyChallenges} />

    </Stack.Navigator>
  );
};

export default AppStackNavigator;