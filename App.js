import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './page/home/HomeScreen';
import MeScreen from './page/me/MeScreen';
import MyAdoption from './page/me/MyAdoption';
import PetDetail from './page/home/PetDetail';
import ArticleScreen from './page/article/ArticleScreen';
import NewArticle from './page/article/NewArticle';
import SignUp from './page/me/SignUp';

// doc: https://reactnavigation.org/docs/bottom-tab-navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PetDetail" component={PetDetail} />
      <Stack.Screen name="PetAdopt" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const ArticleTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
      <Stack.Screen name="NewArticle" component={NewArticle} />
    </Stack.Navigator>
  );
};

const MeTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MeScreen" component={MeScreen} />
      <Stack.Screen name="MyAdoption" component={MyAdoption} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            // ref-Ionicons: https://icons.expo.fyi/Index
            let iconName = 'settings';
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Article') {
              iconName = 'chatbox';
            } else if (route.name === 'Pets') {
              iconName = 'basket';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ffba41',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeTabNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Article"
          component={ArticleTabNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Me"
          component={MeTabNavigator}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
